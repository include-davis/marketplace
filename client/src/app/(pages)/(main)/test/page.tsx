'use client';
import usePost from '@/app/_hooks/usePost';
import styles from './page.module.scss';
import useFetch from '@/app/_hooks/useFetch';

export default function Test() {
  const { result, error, loading } = useFetch('/users/me');
  const {
    postResource,
    pending: resourcePending,
    error: resourceError,
  } = usePost('/messages');

  if (loading) return <div>loading...</div>;
  if (error) return <div>error: {error}</div>;

  function postCallback() {
    // postResource({
    //   userId: '69cb0e43a94ff529cc8b12a3',
    //   title: 'Listing from client side',
    //   desc: 'Test description',
    //   price: 9999,
    //   stock: 9999,
    //   images: [
    //     'https://res.cloudinary.com/dm1havtua/image/upload/v1779659480/main-sample.png',
    //   ],
    // });
    // postResource({
    //   user1id: '69cb0e43a94ff529cc8b12a3',
    //   user2id: '69cb1158039ab28790c904d9',
    //   listingId: '6a136cd69cfa424e14e2d67c',
    // });
    postResource({
        conversationId: '6a1cb4142dde3ed69cbbe8ee',
        senderId: '69cb1158039ab28790c904d9',
        message: 'heyoyoyoyo testing message!!!!',
    });
  }

  return (
    <div className={styles.page}>
      {resourcePending ? (
        'pending...'
      ) : (
        <button onClick={postCallback}>Press me</button>
      )}
      {resourceError && `post error: ${resourceError}`}
      <div>result: {JSON.stringify(result)}</div>
    </div>
  );
}
