// cấu hình graphQL server
import express from "express";
import http from "http";
import { ApolloServer } from "@apollo/server";
import { ApolloServerPluginDrainHttpServer } from "@apollo/server/plugin/drainHttpServer";
import bodyParser from "body-parser";
import { expressMiddleware } from "@apollo/server/express4";
import cors from "cors";

import fakeData from "./fakeData/index.js";

const app = express();
const httpServer = http.createServer(app); // lay app lam tham so

// typeDefs <=> là một document mô tả dl gồm những gì
// trong đó khai báo các root type
const typeDefs = `#graphql
    type Folder {
        id: String,
        name: String,
        createAt: String,
        author: Author
    }

    type Author {
        id: String,
        name: String
    }

    type Query {
        folders: [Folder]
    }
`;

// resolvers dùng để xử lý và trả về dl cho phía client
// dựa theo những query phía client gửi tới
// return dl gì -> sẽ trả về client như vậy
const resolvers = {
    Query: {
        folders: () => {
            return fakeData.folders;
        },
    },
    Folder: {
        author: (parent, agrs) => {
            // lấy ra author id trong parent
            const authorId = parent.authorId;
            // dùng method find() để truy vấn 1 thành phần
            // gán id author = authorId
            return fakeData.authors.find((author) => author.id === authorId);
            // return { id: 123, name: "Liti" };
        },
    },
};

const server = new ApolloServer({
    typeDefs,
    resolvers,
    plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
});

await server.start();
// muốn sd await ở root này ở ngoài mà kh cần bọc trong function thì sửa js -> mjs

// cấu hình express middleware
app.use(cors(), bodyParser.json(), expressMiddleware(server));

// chạy node server trên cổng 4000
await new Promise((resolve) => httpServer.listen({ port: 4000 }, resolve));
console.log("Server ready at http://localhost:4000");
