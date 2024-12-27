const { username, password } = process.env;

if (!username || !password) {
    throw new Error("Missing MongoDB credentials");
}
export const connectionStr = "mongodb+srv://shoaibkhan332002:"+password+"@cluster0.zmwlc.mongodb.net/foodoDB?retryWrites=true&w=majority&appName=Cluster0";
