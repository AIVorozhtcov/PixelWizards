import useNotification from '../../lib/useNotification';

export default function TestComponent() {
  const { showNotification } = useNotification();

  const handleNewMessage = () => {
    showNotification('Новое сообщение!', {
      body: 'У вас новое сообщение от пользователя.',
      icon: '/attack.png',
      silent: true,
    });
  };
  return (
    <div>
      <h1>React Notification API Example</h1>
      <button onClick={handleNewMessage}>Получить сообщение</button>
    </div>
  );
}
