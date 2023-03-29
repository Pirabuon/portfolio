
function ShareButton({ text, url }) {
  const share = async () => {
    try {
      await navigator.share({
        title: document.title,
        text,
        url,
      });
      console.log('Shared successfully');
    } catch (error) {
      console.log('Error sharing:', error);
    }
  };

  return (
    <button onClick={share}>
      Share via Native Apps
    </button>
  );
}

export default ShareButton;
