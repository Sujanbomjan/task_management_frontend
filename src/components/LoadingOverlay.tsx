export default function LoadingOverlay({ isVisible }: { isVisible: boolean }) {
  return (
    <>
      {isVisible && (
        <div className="w-10 h-10 border-4 border-t-blue-500 border-gray-300 rounded-full animate-spin"></div>
      )}
    </>
  );
}
