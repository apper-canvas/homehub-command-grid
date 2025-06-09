import propertyData from '../mockData/property.json';

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

class PropertyService {
  constructor() {
    this.properties = [...propertyData];
  }

  async getAll() {
    await delay(300);
    return [...this.properties];
  }

  async getById(id) {
    await delay(200);
    const property = this.properties.find(p => p.id === id);
    if (!property) {
      throw new Error('Property not found');
    }
    return { ...property };
  }

  async create(propertyData) {
    await delay(500);
    const newProperty = {
      ...propertyData,
      id: Date.now().toString(),
      listingDate: new Date().toISOString()
    };
    this.properties.push(newProperty);
    return { ...newProperty };
  }

  async update(id, updateData) {
    await delay(400);
    const index = this.properties.findIndex(p => p.id === id);
    if (index === -1) {
      throw new Error('Property not found');
    }
    
    this.properties[index] = { ...this.properties[index], ...updateData };
    return { ...this.properties[index] };
  }

  async delete(id) {
    await delay(300);
    const index = this.properties.findIndex(p => p.id === id);
    if (index === -1) {
      throw new Error('Property not found');
    }
    
    const deleted = this.properties.splice(index, 1)[0];
    return { ...deleted };
  }

  async searchByLocation(query) {
    await delay(250);
    const searchTerm = query.toLowerCase();
    const filtered = this.properties.filter(property =>
      property.city.toLowerCase().includes(searchTerm) ||
      property.state.toLowerCase().includes(searchTerm) ||
      property.address.toLowerCase().includes(searchTerm)
    );
    return [...filtered];
  }

  async getByPriceRange(minPrice, maxPrice) {
    await delay(200);
    const filtered = this.properties.filter(property =>
      property.price >= minPrice && property.price <= maxPrice
    );
    return [...filtered];
  }
}

export default new PropertyService();