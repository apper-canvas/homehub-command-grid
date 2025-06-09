import Home from '../pages/Home';
import Browse from '../pages/Browse';
import PropertyDetail from '../pages/PropertyDetail';
import MapView from '../pages/MapView';
import Favorites from '../pages/Favorites';
import MortgageCalculator from '../pages/MortgageCalculator';
import NotFound from '../pages/NotFound';

export const routes = {
  home: {
    id: 'home',
    label: 'Home',
    path: '/',
    icon: 'Home',
    component: Home
  },
  browse: {
    id: 'browse',
    label: 'Browse Properties',
    path: '/browse',
    icon: 'Search',
    component: Browse
  },
  map: {
    id: 'map',
    label: 'Map View',
    path: '/map',
    icon: 'MapPin',
    component: MapView
  },
  favorites: {
    id: 'favorites',
    label: 'Favorites',
    path: '/favorites',
    icon: 'Heart',
    component: Favorites
  },
  calculator: {
    id: 'calculator',
    label: 'Mortgage Calculator',
    path: '/calculator',
    icon: 'Calculator',
    component: MortgageCalculator
  },
  propertyDetail: {
    id: 'propertyDetail',
    label: 'Property Detail',
    path: '/property/:id',
    component: PropertyDetail,
    hidden: true
  },
  notFound: {
    id: 'notFound',
    label: '404',
    path: '*',
    component: NotFound,
    hidden: true
  }
};

export const routeArray = Object.values(routes);
export const navRoutes = routeArray.filter(route => !route.hidden);