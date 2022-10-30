import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { deleteItem } from './asyncActions';
import { ListSliceState, Item } from './types';

const initialState: ListSliceState = {
  list: [],
};

const ListSlice = createSlice({
  name: 'list',
  initialState,
  reducers: {
    setList(state: ListSliceState, action: PayloadAction<ListSliceState>) {
      state.list = action.payload.list;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(deleteItem.pending, (state: ListSliceState) => {
      console.log('peding');
    });
    builder.addCase(deleteItem.fulfilled, (state: ListSliceState, action: PayloadAction<Item>) => {
      state.list = state.list.filter((item) => item.id !== action.payload.id);
    });
    builder.addCase(deleteItem.rejected, (state: ListSliceState) => {
      console.log('err');
    });
  },
});

export const { setList } = ListSlice.actions;

export default ListSlice.reducer;
