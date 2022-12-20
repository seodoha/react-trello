import { atom, selector } from "recoil";
import { recoilPersist } from "recoil-persist";

export interface ITodo {
    id: number;
    text: string;
}

interface IToDoState {
    [key: string]: ITodo[];
}

const { persistAtom } = recoilPersist({
    key: "recoil-persist-atom",
    storage: localStorage,
});

export const todoBoard = atom<IToDoState>({
    key: "board",
    default: {},
    effects_UNSTABLE: [persistAtom],
});
