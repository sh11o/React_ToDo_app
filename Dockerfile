FROM node:24-alpine

WORKDIR /app

# CMDやENTRYPOINTはビルド後のコンテナ起動時なので、最後に書くとよい
CMD [ "sh" ] 