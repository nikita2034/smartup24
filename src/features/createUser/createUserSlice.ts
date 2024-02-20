// import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
// import { User } from '../user/userSlice';
// // Thunk для создания нового пользователя на сервере
// export const createUserOnServer = createAsyncThunk(
//   'user/createUserOnServer',
//   async (userData: User, thunkAPI) => {
//     try {
//       const response = await fetch('API_ENDPOINT', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(userData),
//       });

//       if (!response.ok) {
//         throw new Error('Failed to create user');
//       }

//       const data = await response.json();
//       return data;
//     } catch (error:any) {
//       return thunkAPI.rejectWithValue(error.message);
//     }
//   }
// );

// interface UserData {
//   // Здесь определите тип данных, необходимых для создания пользователя
// }

// interface UserState {
//   newUser: UserData | null;
//   loading: boolean;
//   error: string | null;
// }

// const initialState: UserState = {
//   newUser: null,
//   loading: false,
//   error: null,
// };

// const createUserSlice = createSlice({
//   name: 'user',
//   initialState,
//   reducers: {
//     // Другие редьюсеры, если нужно
//   },
//   extraReducers: (builder) => {
//     builder.addCase(createUserOnServer.pending, (state) => {
//       state.loading = true;
//       state.error = null;
//     });
//     builder.addCase(createUserOnServer.fulfilled, (state, action) => {
//       state.loading = false;
//       state.newUser = action.payload;
//     });
//     builder.addCase(createUserOnServer.rejected, (state, action) => {
//       state.loading = false;
//       state.error = action.payload as string;
//     });
//   },
// });

// // export const { /* другие экшены, если есть */ } = userSlice.actions;
// export default createUserSlice.reducer;



import { createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import { RootState } from '../../store';
import { Product } from '../products/ProductsSlice';
import { Producta } from '../user/userSlice';
interface UserData {
  id: string;
  fname: string;
  lname: string;
  cart:Producta[];
  favorites:Product[];
  partners:unknown[];
  partner_requests:unknown[];
  logo: string;
  title:string;
  role:string;
}

interface ApiUserState {
  data: UserData | null;
  loading: boolean;
  error: string | null;
}

const initialState: ApiUserState = {
  data: null,
  loading: false,
  error: null,
};

// Thunk для создания нового пользователя на сервере
export const createUserOnServer = createAsyncThunk<
  UserData, // Тип возвращаемого значения при успешном выполнении
  UserData, // Тип аргумента запроса на сервер
  { rejectValue: string } // Тип значения, возвращаемого при ошибке
>('user/createUserOnServer', async (userData, thunkAPI) => {
  try {
    const response = await fetch('API_ENDPOINT', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
    });

    if (!response.ok) {
      throw new Error('Failed to create user');
    }

    const data = await response.json();
    return data as UserData;
  } catch (error:any) {
    return thunkAPI.rejectWithValue(error.message);
  }
});

const createUserSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    // Другие редьюсеры, если нужно
  },
  extraReducers: (builder) => {
    builder
      .addCase(createUserOnServer.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createUserOnServer.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(createUserOnServer.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

// export const { /* другие экшены, если есть */ } = userSlice.actions;

// export const selectNewUser = (state: RootState) => state.user.data;
export const selectLoading = (state: RootState) => state.user.loading;
export const selectError = (state: RootState) => state.user.error;

export default createUserSlice.reducer;