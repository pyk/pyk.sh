import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

// Parse last changed at
document.addEventListener("DOMContentLoaded", function () {
    dayjs.extend(relativeTime);
    const lastChangedAt = document.querySelector(
        ".last-changed-at"
    ) as HTMLElement | null;
    if (lastChangedAt == null) {
        throw new Error("Class .last-changed-at is not found");
    }
    const unixTimestampMs = parseInt(lastChangedAt.dataset.lastChangedAt);
    lastChangedAt.innerHTML = "changed " + dayjs(unixTimestampMs).fromNow();
});
