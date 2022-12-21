import { DragDropContext, DropResult, Droppable } from "react-beautiful-dnd";
import styled from "styled-components";
import { todoBoard } from "./atoms";
import { useRecoilState } from "recoil";
import Board from "./components/Board";
import AddBoard from "./components/AddBoard";
import Trash from "./components/Trash";

const Wrapper = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    gap: 20px;
    width: 100vw;
    min-height: 100vh;
    margin: 0 auto;
    padding: 50px 20px;
`;

const Boards = styled.div`
    display: flex;
    gap: 10px;
    width: 100%;
`;

function App() {
    const [toDos, setToDos] = useRecoilState(todoBoard);

    const onDragEnd = (info: DropResult) => {
        const { destination, draggableId, source, type } = info;
        if (!destination) return;
        console.log(info);

        if (type === "COLUMN") {
        }

        if (type === "DEFAULT") {
            if (destination.droppableId === "delete") {
                return setToDos((allBoards) => {
                    return {
                        ...allBoards,
                        [source.droppableId]: [
                            ...allBoards[source.droppableId].slice(0, source.index),
                            ...allBoards[source.droppableId].slice(source.index + 1),
                        ],
                    };
                });
            }

            if (destination?.droppableId === source.droppableId) {
                setToDos((allBoards) => {
                    const boardCopy = [...allBoards[source.droppableId]];
                    const taskObj = boardCopy[source.index];
                    boardCopy.splice(source.index, 1);
                    boardCopy.splice(destination.index, 0, taskObj);
                    return {
                        ...allBoards,
                        [source.droppableId]: boardCopy,
                    };
                });
            }

            if (destination?.droppableId !== source.droppableId) {
                setToDos((allBoards) => {
                    const sourceBoard = [...allBoards[source.droppableId]];
                    const taskObj = sourceBoard[source.index];
                    const destinationBoard = [...allBoards[destination.droppableId]];
                    sourceBoard.splice(source.index, 1);
                    destinationBoard.splice(destination.index, 0, taskObj);
                    return {
                        ...allBoards,
                        [source.droppableId]: sourceBoard,
                        [destination.droppableId]: destinationBoard,
                    };
                });
            }
        }
    };

    console.log(toDos);

    return (
        <DragDropContext onDragEnd={onDragEnd}>
            <Wrapper>
                <AddBoard />
                {/* <Boards>
                    {Object.keys(toDos).map((boardId: string) => (
                        <Board toDos={toDos[boardId]} key={boardId} boardId={boardId} />
                    ))}
                    <Trash />
                </Boards> */}
                <Droppable droppableId="board" type="COLUMN" direction="horizontal">
                    {(provided) => (
                        <Boards ref={provided.innerRef} {...provided.droppableProps}>
                            {Object.keys(toDos).map((boardId: string) => (
                                <Board toDos={toDos[boardId]} key={boardId} boardId={boardId} />
                            ))}
                            {provided.placeholder}
                        </Boards>
                    )}
                </Droppable>
                <Trash />
            </Wrapper>
        </DragDropContext>
    );
}

export default App;
