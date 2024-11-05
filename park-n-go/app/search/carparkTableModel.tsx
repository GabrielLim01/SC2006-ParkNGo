// Filter Strategy Interface
class FilterStrategy {
    filter(carpark) {
      throw new Error("Filter method should be implemented by subclasses");
    }
  }
//Concrete strategies
export class NightParkingFilter extends FilterStrategy {
    enabled;
    constructor(enabled) {
      super();
      this.enabled = enabled;
    }
  
    filter(carpark) {
      return this.enabled ? carpark.night_parking === 'YES' : true;
    }
  }
export class FreeParkingFilter extends FilterStrategy {
    enabled;
    constructor(enabled) {
      super();
      this.enabled = enabled;
    }
  
    filter(carpark) {
      return this.enabled ? carpark.free_parking !== 'NO' : true;
    }
  }
export class SearchTermFilter extends FilterStrategy {
    searchTerm;
    constructor(searchTerm) {
      super();
      this.searchTerm = searchTerm.toLowerCase();
    }
  
    filter(carpark) {
      if (!this.searchTerm || this.searchTerm.trim() === '') return true;
      return (
        carpark.car_park_no.toLowerCase().includes(this.searchTerm) ||
        carpark.address.toLowerCase().includes(this.searchTerm) ||
        carpark.car_park_type.toLowerCase().includes(this.searchTerm) ||
        carpark.type_of_parking_system.toLowerCase().includes(this.searchTerm)
      );
    }
  }
export class CarparkTypeFilter extends FilterStrategy {
    type;
    constructor(type) {
      super();
      this.type = type;
    }
  
    filter(carpark) {
      return this.type === "ANY" || carpark.car_park_type === this.type;
    }
  }
export class GantryHeightFilter extends FilterStrategy {
    minHeight;
    maxHeight;
    constructor(minHeight, maxHeight) {
      super();
      this.minHeight = minHeight;
      this.maxHeight = maxHeight;
    }
  
    filter(carpark) {
      return carpark.gantry_height >= this.minHeight && carpark.gantry_height <= this.maxHeight;
    }
  } 
export class CarparkFilterContext {
    strategies;
    constructor(strategies) {
      this.strategies = strategies;
    }
  
    filter(carparkInfo) {
      return carparkInfo.filter(carpark => 
        this.strategies.every(strategy => strategy.filter(carpark))
      );
    }
  }
