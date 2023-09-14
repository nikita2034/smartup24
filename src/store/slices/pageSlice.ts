import { createSlice, PayloadAction } from '@reduxjs/toolkit';
interface PageState {
    selectedPage: "link1" | "link2" | "link3"; // You can use a string to represent the selected page
  }
const initialState: PageState = {
  selectedPage: 'link1', // You can initialize it to an empty string or a default page
};

const pageSlice = createSlice({
  name: 'page',
  initialState,
  reducers: {
    selectPage: (state, action: PayloadAction<PageState['selectedPage']>) => {
      state.selectedPage = action.payload;
    },
  },
});

export const { selectPage } = pageSlice.actions;
export default pageSlice.reducer;