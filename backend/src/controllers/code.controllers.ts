import { OK } from "../constants/http";
import { APIResponse } from "../lib/standardize/APIResponse";
import { asyncHandler } from "../lib/standardize/asyncHandler";
import { pistonAPI } from "../lib/utils/axios";

const getRuntimes = asyncHandler(async (req, res, next) => {
    const response = await pistonAPI.get("/runtimes");
    const data = response.data;
    
    res.status(OK).json(
        new APIResponse(OK, data, "Runtimes Fetched Successfully!")
    );
});

const executeCode = asyncHandler(async (req, res, next) => {
    const { language, version, code } = req.body;
    console.log(language, version, code);
    

    const response = await pistonAPI.post('/execute', {
        language,
        version,
        files: [
            {
                content: code
            }
        ]
    });

    const data = response.data;

    res.status(OK).json(
        new APIResponse(OK, data, "Code Executed Successfully!")
    );
});

export { getRuntimes, executeCode };