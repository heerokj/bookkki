export const queryKeys = {
  feeds: {
    all: ["feeds"],
  },
  search: {
    all: (bookTitle: string) => ["books", bookTitle],
  },
  comment: {
    all: ["comments"],
  },
  chat: {
    all: ["chatRooms"],
  },
};
