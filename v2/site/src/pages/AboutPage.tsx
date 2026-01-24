import { SEO } from "../components/SEO";

export function AboutPage() {
  return (
    <>
      <SEO
        title="About - The History of Bufo"
        description="Learn about the history of bufo as far as I know it. If you have additional details, please open a pr and add them."
        keywords="bufo, about, frog, history, origin, meme, character"
        url="https://bufo.fun/about"
      />
      <div className="flex flex-col items-center justify-center min-h-[calc(100vh-200px)] px-4">
        <div className="max-w-2xl text-center">
          <h1 className="text-5xl font-bold text-gray-800 mb-6">About</h1>
          <p className="text-xl text-gray-600 mb-8">
            The history and origin of Bufo
          </p>
          <div className="bg-white rounded-lg shadow-lg p-12 border-2 border-bufo-500">
            <p className="text-gray-500 text-lg mb-4">
              Bufo is a frog character.
            </p>
            <p className="text-gray-500 text-lg">
              Sometimes referred to as 'froge'.
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
