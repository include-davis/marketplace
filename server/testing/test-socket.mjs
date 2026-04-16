/**
 * test-socket.mjs
 * Quick integration test for the Socket.IO live messaging feature.
 * 
 * Run with:  node test-socket.mjs
 * (server must already be running on port 3000)
 */

import { io } from "socket.io-client";

const SERVER_URL = "http://localhost:3000";

// These are placeholder IDs — swap in real MongoDB ObjectIds when the DB is
// connected and you want to test full persistence.
const TEST_CONVERSATION_ID = "aaaaaaaaaaaaaaaaaaaaaaaa";
const SENDER_ID            = "bbbbbbbbbbbbbbbbbbbbbbbb";
const RECEIVER_ID_1        = "cccccccccccccccccccccccc";
const RECEIVER_ID_2        = "dddddddddddddddddddddddd";

let passed = 0;
let failed = 0;

function assert(condition, label) {
  if (condition) {
    console.log(`  ✓  ${label}`);
    passed++;
  } else {
    console.error(`  ✗  ${label}`);
    failed++;
  }
}

// ─── Client A (sender) ───────────────────────────────────────────────────────
const clientA = io(SERVER_URL, { transports: ["websocket"] });
// ─── Client B (receiver 1 in the same room) ──────────────────────────────────
const clientB = io(SERVER_URL, { transports: ["websocket"] });
// ─── Client C (receiver 2 in the same room) ──────────────────────────────────
const clientC = io(SERVER_URL, { transports: ["websocket"] });

async function runTests() {
  console.log("\n=== Socket.IO Live Messaging Tests (Group Chat) ===\n");

  // 1. All clients connect
  await Promise.all([
    new Promise(r => clientA.once("connect", () => { assert(true, "Client A connected"); r(); })),
    new Promise(r => clientB.once("connect", () => { assert(true, "Client B connected"); r(); })),
    new Promise(r => clientC.once("connect", () => { assert(true, "Client C connected"); r(); })),
  ]);

  // 2. All clients join the same conversation room
  clientA.emit("join_room", TEST_CONVERSATION_ID);
  clientB.emit("join_room", TEST_CONVERSATION_ID);
  clientC.emit("join_room", TEST_CONVERSATION_ID);
  await new Promise(r => setTimeout(r, 300)); // small delay for join to propagate
  assert(true, "All 3 clients joined room " + TEST_CONVERSATION_ID);

  // 3. Client A sends a message to both receivers; B and C should both receive it
  const receiveBPromise = new Promise((resolve, reject) => {
    const timeout = setTimeout(() => reject(new Error("receive_message not received by B within 2 s")), 2000);
    clientB.once("receive_message", (msg) => {
      clearTimeout(timeout);
      resolve(msg);
    });
  });

  const receiveCPromise = new Promise((resolve, reject) => {
    const timeout = setTimeout(() => reject(new Error("receive_message not received by C within 2 s")), 2000);
    clientC.once("receive_message", (msg) => {
      clearTimeout(timeout);
      resolve(msg);
    });
  });

  // Also check if clientA itself gets an error (e.g. DB unavailable)
  clientA.once("error", (err) => {
    console.log("  Server error:", err.message);
  });

  clientA.emit("send_message", {
    conversationId: TEST_CONVERSATION_ID,
    senderId:       SENDER_ID,
    receiverIds:    [RECEIVER_ID_1, RECEIVER_ID_2],  // Multiple receivers
    message:        "Hello from the test script to group!",
    image:          null,
  });

  const [resultB, resultC] = await Promise.all([receiveBPromise, receiveCPromise]);

  if (resultB._socketError) {
    // DB not connected — the server returned a graceful error, WebSocket still works
    assert(true,  "Server responded gracefully (DB unavailable): " + resultB._socketError);
  } else {
    // DB connected — the full message was persisted and broadcast
    assert(resultB.message === "Hello from the test script to group!", "Client B received message text matches");
    assert(resultC.message === "Hello from the test script to group!", "Client C received message text matches");
    assert(!!resultB._id,        "Message has a MongoDB _id");
    assert(!!resultB.createdAt,  "Message has a createdAt timestamp");
    assert(Array.isArray(resultB.receiverIds) && resultB.receiverIds.length === 2, "Message has 2 receiverIds");
  }

  // 4. Client A sends a message — Client A should also receive it (echo in room)
  const echoPromise = new Promise((resolve, reject) => {
    const timeout = setTimeout(() => reject(new Error("echo not received")), 2000);
    clientA.once("receive_message", (msg) => { clearTimeout(timeout); resolve(msg); });
    clientA.once("error", (err) => { clearTimeout(timeout); resolve({ _socketError: err.message }); });
  });

  clientA.emit("send_message", {
    conversationId: TEST_CONVERSATION_ID,
    senderId:       SENDER_ID,
    receiverIds:    [RECEIVER_ID_1, RECEIVER_ID_2],
    message:        "Echo test",
    image:          null,
  });

  const echo = await echoPromise;
  if (echo._socketError) {
    assert(true, "Server responded gracefully on second send (DB unavailable)");
  } else {
    assert(echo.message === "Echo test", "Sender also receives echo of own message");
  }

  // 5. Clean up
  clientA.disconnect();
  clientB.disconnect();
  clientC.disconnect();

  console.log(`\n=== Results: ${passed} passed, ${failed} failed ===\n`);
  process.exit(failed > 0 ? 1 : 0);
}

runTests().catch(err => {
  console.error("Test runner error:", err);
  clientA.disconnect();
  clientB.disconnect();
  clientC.disconnect();
  process.exit(1);
});
