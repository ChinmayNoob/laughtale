const EVENTS = {
    DRAW_CARD: "draw-card",
    CLOSE_CARD: "close-card",
    TAKE_JOLLYROGER: "take-jollyroger",
};

const drawnCardEvent = () => {
    const event = new CustomEvent(EVENTS.DRAW_CARD);
    window.dispatchEvent(event);
}

const closeCardEvent = () => {
    const event = new CustomEvent(EVENTS.CLOSE_CARD);
    window.dispatchEvent(event);
}

const takeJollyrogerEvent = () => {
    const event = new CustomEvent(EVENTS.TAKE_JOLLYROGER);
    window.dispatchEvent(event);
}

export { EVENTS, drawnCardEvent, closeCardEvent, takeJollyrogerEvent };