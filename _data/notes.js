const fm = require("front-matter");

// Get all note in HackMD with tag "public"
module.exports = async function () {
    if (!process.env.HACKMD_API_TOKEN) {
        throw new Error("HACKMD_API_TOKEN is undefined");
    }

    const response = await fetch("https://api.hackmd.io/v1/notes", {
        headers: {
            Authorization: `Bearer ${process.env.HACKMD_API_TOKEN}`,
        },
    });
    const data = await response.json();
    const publicNotes = data.filter((post) => post.tags.includes("public"));
    const getAllPublicNotes = publicNotes.map((post) => {
        const getPost = async () => {
            const response = await fetch(
                `https://api.hackmd.io/v1/notes/${post.id}`,
                {
                    headers: {
                        Authorization: `Bearer ${process.env.HACKMD_API_TOKEN}`,
                    },
                }
            );
            const data = await response.json();
            const { attributes } = fm(data.content);
            return { attributes, data };
        };
        return getPost();
    });
    const publicNoteData = await Promise.all(getAllPublicNotes);
    // console.log(publicNoteData);
    // console.log(publicNoteData[0].data.lastChangeUser);

    return publicNoteData;
};
