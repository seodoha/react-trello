import { DragDropContext, DropResult } from "react-beautiful-dnd";
import styled from "styled-components";
import { toDoState } from "./atoms";
import { useRecoilState } from "recoil";
import Board from "./components/Board";

const Wrapper = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100vw;
    height: 100vh;
    margin: 0 auto;
`;

const Boards = styled.div`
    display: flex;
    justify-content: center;
    align-items: flex-start;
    gap: 10px;
    width: 100%;
`;

function App() {
    const [toDos, setToDos] = useRecoilState(toDoState);
    const onDragEnd = (info: DropResult) => {
        const { destination, draggableId, source } = info;

        if (!destination) return;

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
    };
    return (
        <DragDropContext onDragEnd={onDragEnd}>
            <Wrapper>
                <Boards>
                    {Object.keys(toDos).map((boardId) => (
                        <Board toDos={toDos[boardId]} key={boardId} boardId={boardId} />
                    ))}
                </Boards>
            </Wrapper>
        </DragDropContext>
    );
}

export default App;
