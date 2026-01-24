export function AboutPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-200px)] px-4">
      <div className="max-w-2xl text-center">
        <h1 className="text-5xl font-bold text-gray-800 mb-6">About</h1>
        <p className="text-xl text-gray-600 mb-8">
          Learn more about bufo.fun and our collection of bufos.
        </p>
        <div className="bg-white rounded-lg shadow-lg p-12 border-2 border-bufo-500">
          <p className="text-gray-500 text-lg mb-4">
            bufo.fun is a delightful collection of bufos for your enjoyment.
          </p>
          <p className="text-gray-500 text-lg">
            Explore, search, and discover quite a few bufos!
          </p>
        </div>
      </div>
    </div>
  );
}
