import axios from "axios";
import { useContext } from "react";
import { useReducer } from "react";
import { useEffect } from "react";
import { createContext } from "react";
import { toast } from "react-hot-toast";

const BookmarkContext = createContext();
const BASE_URL = "http://localhost:5000/bookmarks";

const intialStates = {
  bookmarks: [],
  isLoading: false,
  currentBookmark: {},
  error: null,
};

function bookmarkReducer(state, action) {
  switch (action.type) {
    case "loading":
      return {
        ...state,
        isLoading: true,
      };
    case "bookmarks/loaded":
      return {
        ...state,
        isLoading: false,
        bookmarks: action.payload,
      };
    case "bookmark/loaded":
      return {
        ...state,
        isLoading: false,
        currentBookmark: action.payload,
      };

    case "bookmark/created":
      return {
        ...state,
        isLoading: false,
        bookmarks: [...state.bookmarks, action.payload],
        currentBookmark: action.payload,
      };
    case "bookmark/deleted":
      return {
        ...state,
        isLoading: false,
        bookmarks: state.bookmarks.filter((item) => item.id !== action.payload),
      };
    case "rejected":
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };
    default:
      throw new Error("s");
  }
}

const BookmarksProvider = ({ children }) => {
  // const [currentBookmark, setCurrentBookmark] = useState(null);
  // const [bookmarks, setBookmarks] = useState([]);
  // const [isLoading, setIsLoading] = useState(true);

  const [{ bookmarks, isLoading, currentBookmark, error }, dispatch] =
    useReducer(bookmarkReducer, intialStates);

  useEffect(() => {
    async function fetchBookmarks() {
      try {
        const { data } = await axios.get(`${BASE_URL}`);
        dispatch({ type: "bookmarks/loaded", payload: data });
      } catch (error) {
        toast.error(error.message);
        dispatch({ type: "rejected", payload: "not working" });
      }
      console.log();
    }
    fetchBookmarks();
  }, []);

  async function deleteBookmark(id) {
    await axios.delete(`${BASE_URL}/${id}`);
    try {
      dispatch({ type: "bookmark/deleted", payload: id });
    } catch (error) {
      toast.error(error.message);
    }
  }

  async function createBookmark(newBookmark) {
    try {
      const { data } = await axios.post(`${BASE_URL}`, newBookmark);
      dispatch({ type: "bookmark/created", payload: data });
      console.log(state.bookmarks, "crea");
    } catch (error) {
      toast.error(error.messsage);
    }
  }

  async function getBookmark(id) {
    if (Number(id) === currentBookmark?.id) return;

    dispatch({ type: "loading" });
    try {
      const { data } = await axios.get(`${BASE_URL}/${id}`);
      dispatch({ type: "bookmark/loaded", payload: data });
    } catch (error) {
      toast.error(error.message);
      dispatch({
        type: "rejected",
        payload: "an Error occurred in fetching single bookmark",
      });
    }
  }

  return (
    <BookmarkContext.Provider
      value={{
        isLoading,
        bookmarks,
        getBookmark,
        isLoading,
        currentBookmark,
        createBookmark,
        deleteBookmark,
      }}
    >
      {children}
    </BookmarkContext.Provider>
  );
};

export default BookmarksProvider;
export function useBookmark() {
  return useContext(BookmarkContext);
}
