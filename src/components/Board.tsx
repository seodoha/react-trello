import { Droppable } from "react-beautiful-dnd";
import styled from "styled-components";
import DragabbleCard from "./DragabbleCard";
import { useForm } from "react-hook-form";
import { ITodo, toDoState } from "./../atoms";
import { useRecoilState, useSetRecoilState } from "recoil";

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    width: 300px;
    min-height: 300px;
    padding: 10px 0 0;
    background-color: ${(props) => props.theme.boardColor};
    border-radius: 5px;
`;

const Title = styled.h2`
    margin-bottom: 10px;
    text-align: center;
    font-size: 20px;
    font-weight: 600;
`;

interface IAreaProps {
    isDraggingOver: boolean;
    isDraggingFromThis: boolean;
}

const Area = styled.div<IAreaProps>`
    flex-grow: 1;
    padding: 20px;
    background-color: ${(props) => (props.isDraggingOver ? "#dfe6e9" : props.isDraggingFromThis ? "#b2bec3" : "transparent")};
    transition: background-color 0.3s ease-in-out;
`;

const Form = styled.form`
    width: 100%;
    padding: 0 20px;
`;

const Input = styled.input`
    width: 100%;
    height: 40px;
    border: none;
    border-bottom: 1px solid black;
    background-color: transparent;
`;

interface IBoardProps {
    toDos: ITodo[];
    boardId: string;
}

interface IForm {
    toDo: string;
}

function Board({ toDos, boardId }: IBoardProps) {
    const setToDos = useSetRecoilState(toDoState);
    const { register, setValue, handleSubmit } = useForm<IForm>();
    const onValid = ({ toDo }: IForm) => {
        const newToDo = {
            id: Date.now(),
            text: toDo,
        };
        setToDos((allBoards) => {
            return {
                ...allBoards,
                [boardId]: [newToDo, ...allBoards[boardId]],
            };
        });
        setValue("toDo", "");
    };
    return (
        <Wrapper>
            <Title>{boardId}</Title>
            <Form onSubmit={handleSubmit(onValid)}>
                <Input type="text" placeholder={`Add task on ${boardId}`} {...register("toDo", { required: true })} />
            </Form>
            <Droppable droppableId={boardId}>
                {(magic, info) => (
                    <Area
                        isDraggingOver={info.isDraggingOver}
                        isDraggingFromThis={Boolean(info.draggingFromThisWith)}
                        ref={magic.innerRef}
                        {...magic.droppableProps}
                    >
                        {toDos.map((todo, index) => (
                            <DragabbleCard key={todo.id} toDoId={todo.id} toDoText={todo.text} index={index} />
                        ))}
                        {magic.placeholder}
                    </Area>
                )}
            </Droppable>
        </Wrapper>
    );
}

export default Board;
