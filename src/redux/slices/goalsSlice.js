import { createSlice } from '@reduxjs/toolkit';

const goalsSlice = createSlice({
  name: 'goals',
  initialState: {
    activeTabKey: null,
    pillarData: [],
    loading: true,
    isSaved: false,
  },
  reducers: {
    setActiveTabKey(state, action) {
      state.activeTabKey = action.payload;
    },
    setPillarData(state, action) {
      state.pillarData = action.payload;
      const energyTab = action.payload.find(
        (pillar) => pillar.pillarName === 'Energy'
      );
      state.activeTabKey = energyTab ? energyTab.pillarName : action.payload[0].pillarName;
      state.loading = false;
    },
    setLoading(state, action) {
      state.loading = action.payload;
    },
    setIsSaved(state, action) {
      state.isSaved = action.payload;
    },
  },
});

export const { setActiveTabKey, setPillarData, setLoading, setIsSaved } = goalsSlice.actions;
export default goalsSlice.reducer;
