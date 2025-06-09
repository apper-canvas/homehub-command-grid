import MainFeature from '../components/MainFeature';

const Browse = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-heading font-bold text-primary mb-2">
          Browse Properties
        </h1>
        <p className="text-gray-600">
          Discover your perfect home from our extensive collection of properties
        </p>
      </div>
      
      <MainFeature />
    </div>
  );
};

export default Browse;