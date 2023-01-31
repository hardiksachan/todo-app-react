import "dotenv/config";
import express, {NextFunction, Request, Response} from "express";
import NoteModel from "./models/note";

const app = express();

app.get("/", async (req: Request, res: Response, next: NextFunction) => {
    try {
        const notes = await NoteModel.find().exec();
        res.status(200).json(notes);
    } catch (error) {
        next(error);
    }
});

app.use((req: Request, res: Response, next: NextFunction) => {
    next(Error("endpoint not found"))
})

// eslint-disable-next-line @typescript-eslint/no-unused-vars
app.use((error: unknown, req: Request, res: Response, next: NextFunction) => {
    console.log(error);
    let msg = "An unknown error occured";
    if (error instanceof Error) {
        msg = error.message;
    }
    res.status(500).json({error: msg});
});

export default app;