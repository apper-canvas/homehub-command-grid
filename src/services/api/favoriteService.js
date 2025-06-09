const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

class FavoriteService {
  constructor() {
    this.storageKey = 'homehub_favorites';
  }

  getFavorites() {
    try {
      const favorites = localStorage.getItem(this.storageKey);
      return favorites ? JSON.parse(favorites) : [];
    } catch (error) {
      console.error('Error loading favorites:', error);
      return [];
    }
  }

  getFavoriteIds() {
    const favorites = this.getFavorites();
    return favorites.map(fav => fav.propertyId);
  }

  async addFavorite(propertyId) {
    await delay(200);
    const favorites = this.getFavorites();
    
    if (favorites.some(fav => fav.propertyId === propertyId)) {
      throw new Error('Property already in favorites');
    }

    const newFavorite = {
      propertyId,
      savedDate: new Date().toISOString()
    };

    favorites.push(newFavorite);
    localStorage.setItem(this.storageKey, JSON.stringify(favorites));
    
    // Dispatch custom event for favorites change
    window.dispatchEvent(new CustomEvent('favoritesChanged'));
    
    return { ...newFavorite };
  }

  async removeFavorite(propertyId) {
    await delay(200);
    const favorites = this.getFavorites();
    const index = favorites.findIndex(fav => fav.propertyId === propertyId);
    
    if (index === -1) {
      throw new Error('Property not in favorites');
    }

    const removed = favorites.splice(index, 1)[0];
    localStorage.setItem(this.storageKey, JSON.stringify(favorites));
    
    // Dispatch custom event for favorites change
    window.dispatchEvent(new CustomEvent('favoritesChanged'));
    
    return { ...removed };
  }

  async clearFavorites() {
    await delay(100);
    localStorage.removeItem(this.storageKey);
    
    // Dispatch custom event for favorites change
    window.dispatchEvent(new CustomEvent('favoritesChanged'));
    
    return true;
  }

  async getAll() {
    await delay(150);
    return [...this.getFavorites()];
  }

  async getById(propertyId) {
    await delay(100);
    const favorites = this.getFavorites();
    const favorite = favorites.find(fav => fav.propertyId === propertyId);
    
    if (!favorite) {
      throw new Error('Favorite not found');
    }
    
    return { ...favorite };
  }

  isFavorite(propertyId) {
    const favoriteIds = this.getFavoriteIds();
    return favoriteIds.includes(propertyId);
  }
}

export default new FavoriteService();