import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  getLocations,
  getCurrentLocation,
  getFiveDayForecast,
  getLocationByGeolocation,
} from "./weatherAPI";

const initialState = {
  search: "",
  isMetric: true,
  darkMode: false,
  selectFromFavorites: false,
  favorites: [],
  locationList: {
    status: "loading",
    error: "",
    list: [],
  },
  currentLocationGeo: {
    status: "loading",
    error: "",
    location: {},
  },
  currentLocation: {
    status: "loading",
    error: "",
    Name: "",
    Key: "",
    location: [
      {
        LocalObservationDateTime: "",
        EpochTime: 0,
        WeatherText: "",
        WeatherIcon: 0,
        HasPrecipitation: false,
        PrecipitationType: null,
        IsDayTime: false,
        Temperature: {
          Metric: {
            Value: 0,
            Unit: "C",
            UnitType: 17,
          },
          Imperial: {
            Value: 0,
            Unit: "F",
            UnitType: 18,
          },
        },
        MobileLink: "",
        Link: "",
      },
    ],
  },
  currentForecast: {
    status: "loading",
    error: "",
    forecast: {
      DailyForeCasts: [],
    },
  },
};

export const fetchLocations = createAsyncThunk(
  "weather/fetchLocations",
  async (location, { rejectWithValue }) => {
    try {
      const res = await getLocations(location);
      return await res;
    } catch (err) {
      return rejectWithValue([], err);
    }
  }
);

export const fetchCurrentLocation = createAsyncThunk(
  "weather/fetchCurrentLocation",
  async (id, { rejectWithValue }) => {
    try {
      const res = await getCurrentLocation(id);
      return await res;
    } catch (err) {
      return rejectWithValue([], err);
    }
  }
);

export const fetchCurrentLocationForFavorites = createAsyncThunk(
  "weather/fetchCurrentLocationForFavorites",
  async (id, { rejectWithValue }) => {
    try {
      const res = await getCurrentLocation(id);
      return await res;
    } catch (err) {
      return rejectWithValue([], err);
    }
  }
);

export const fetchFiveDayForecast = createAsyncThunk(
  "weather/fetchFiveDayForecast",
  async (id, { rejectWithValue }) => {
    try {
      const res = await getFiveDayForecast(id);
      return await res;
    } catch (err) {
      return rejectWithValue([], err);
    }
  }
);

export const fetchLocationByGeolocation = createAsyncThunk(
  "weather/fetchLocationByGeolocation",
  async ({ lat, lon }, { rejectWithValue }) => {
    console.log(lat);
    try {
      const res = await getLocationByGeolocation(lat, lon);
      return await res;
    } catch (err) {
      return rejectWithValue([], err);
    }
  }
);

export const weatherSlice = createSlice({
  name: "weather",
  initialState,
  reducers: {
    searchLocation: (state, action) => {
      state.search = action.payload;
    },
    setCurrentLocationName: (state, action) => {
      state.currentLocation.Name = action.payload;
    },
    setCurrentLocationKey: (state, action) => {
      state.currentLocation.Key = action.payload;
    },
    changeSystem: (state, action) => {
      state.isMetric = action.payload;
    },
    addToFavorites: (state, action) => {
      const { currentName, currentLocationKey } = action.payload;
      state.favorites = [
        ...state.favorites,
        { Name: currentName, Key: currentLocationKey },
      ];
    },
    removeFromFavorites: (state, action) => {
      state.favorites = state.favorites.filter(
        (location) => location.Key !== action.payload
      );
    },
    getFavorites: (state, action) => {
      state.favorites = action.payload;
    },
    changeMode: (state) => {
      state.darkMode = !state.darkMode;
    },
    getMode: (state, action) => {
      state.darkMode = action.payload;
    },
    selectLocation: (state, action) => {
      state.selectFromFavorites = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchLocations.pending, (state) => {
      state.locationList.list = [];
      state.locationList.status = "loading";
    });
    builder.addCase(fetchLocations.fulfilled, (state, { payload }) => {
      state.locationList.list = payload ? payload : [];
      state.locationList.status = "idle";
    });
    builder.addCase(fetchLocations.rejected, (state, action) => {
      state.locationList.status = "error";
      state.locationList.error = action.error.message;
    });
    builder.addCase(fetchCurrentLocation.pending, (state) => {
      state.currentLocation.location = [];
      state.currentLocation.status = "loading";
    });
    builder.addCase(fetchCurrentLocation.fulfilled, (state, { payload }) => {
      state.currentLocation.location = payload;
      state.currentLocation.status = "idle";
    });
    builder.addCase(fetchCurrentLocation.rejected, (state, action) => {
      state.currentLocation.status = "error";
      state.currentLocation.error = action.error.message;
    });

    builder.addCase(fetchFiveDayForecast.pending, (state) => {
      state.currentForecast.forecast = [];
      state.currentForecast.status = "loading";
    });
    builder.addCase(fetchFiveDayForecast.fulfilled, (state, { payload }) => {
      state.currentForecast.forecast = payload;
      state.currentForecast.status = "idle";
    });
    builder.addCase(fetchFiveDayForecast.rejected, (state, action) => {
      state.currentForecast.status = "error";
      state.currentForecast.error = action.error.message;
    });
    builder.addCase(fetchLocationByGeolocation.pending, (state) => {
      state.currentLocationGeo.location = {};
      state.currentLocationGeo.status = "loading";
    });
    builder.addCase(
      fetchLocationByGeolocation.fulfilled,
      (state, { payload }) => {
        state.currentLocationGeo.location = payload;
        state.currentLocationGeo.status = "idle";
      }
    );
    builder.addCase(fetchLocationByGeolocation.rejected, (state, action) => {
      state.currentLocationGeo.status = "error";
      state.currentLocationGeo.error = action.error.message;
    });
  },
});

export const {
  searchLocation,
  setCurrentLocationName,
  setCurrentLocationKey,
  changeSystem,
  addToFavorites,
  getFavorites,
  removeFromFavorites,
  changeMode,
  getMode,
  selectLocation,
} = weatherSlice.actions;

export default weatherSlice;
