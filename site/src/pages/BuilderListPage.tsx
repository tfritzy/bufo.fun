import { Link } from "react-router-dom";
import { builderTemplates } from "../builderTemplates";

export function BuilderListPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">
            Bufo Builder
          </h1>
          <p className="text-lg text-gray-600">
            Choose a template to create your own custom bufo
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {builderTemplates.map((template) => (
            <Link
              key={template.id}
              to={`/builder/${template.id}`}
              className="group block bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-200 overflow-hidden border border-gray-200 hover:border-bufo-400"
            >
              <div className="aspect-square bg-gray-100 flex items-center justify-center p-4">
                <img
                  src={template.thumbnail}
                  alt={template.name}
                  className="max-w-full max-h-full object-contain group-hover:scale-105 transition-transform duration-200"
                />
              </div>
              <div className="p-4 border-t border-gray-100">
                <h3 className="text-lg font-semibold text-gray-800 group-hover:text-bufo-500 transition-colors">
                  {template.name}
                </h3>
                <p className="text-sm text-gray-500 mt-1">
                  {template.description}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
