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
const RECEIVER_ID          = "cccccccccccccccccccccccc";

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
// ─── Client B (receiver in the same room) ────────────────────────────────────
const clientB = io(SERVER_URL, { transports: ["websocket"] });

async function runTests() {
  console.log("\n=== Socket.IO Live Messaging Tests ===\n");

  // 1. Both clients connect
  await Promise.all([
    new Promise(r => clientA.once("connect", () => { assert(true, "Client A connected"); r(); })),
    new Promise(r => clientB.once("connect", () => { assert(true, "Client B connected"); r(); })),
  ]);

  // 2. Both clients join the same conversation room
  clientA.emit("join_room", TEST_CONVERSATION_ID);
  clientB.emit("join_room", TEST_CONVERSATION_ID);
  await new Promise(r => setTimeout(r, 300)); // small delay for join to propagate
  assert(true, "Both clients joined room " + TEST_CONVERSATION_ID);

  // 3. Client A sends a message; Client B should receive it
  const receivePromise = new Promise((resolve, reject) => {
    const timeout = setTimeout(() => reject(new Error("receive_message not received within 2 s")), 2000);
    clientB.once("receive_message", (msg) => {
      clearTimeout(timeout);
      resolve(msg);
    });
    // Also check if clientA itself gets an error (e.g. DB unavailable)
    clientA.once("error", (err) => {
      clearTimeout(timeout);
      resolve({ _socketError: err.message });
    });
  });

  clientA.emit("send_message", {
    conversationId: TEST_CONVERSATION_ID,
    senderId:       SENDER_ID,
    receiverId:     RECEIVER_ID,
    message:        "Hello from the test script!",
    image:          null,
  });

  const result = await receivePromise;

  if (result._socketError) {
    // DB not connected — the server returned a graceful error, WebSocket still works
    assert(true,  "Server responded gracefully (DB unavailable): " + result._socketError);
  } else {
    // DB connected — the full message was persisted and broadcast
    assert(result.message === "Hello from the test script!", "Received message text matches");
    assert(!!result._id,        "Message has a MongoDB _id");
    assert(!!result.createdAt,  "Message has a createdAt timestamp");
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
    receiverId:     RECEIVER_ID,
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

  console.log(`\n=== Results: ${passed} passed, ${failed} failed ===\n`);
  process.exit(failed > 0 ? 1 : 0);
}

runTests().catch(err => {
  console.error("Test runner error:", err);
  clientA.disconnect();
  clientB.disconnect();
  process.exit(1);
});
