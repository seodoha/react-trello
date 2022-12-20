import { Draggable } from "react-beautiful-dnd";
import styled from "styled-components";
import React from "react";
import { useSetRecoilState } from "recoil";
import { todoBoard } from "../atoms";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";

const Card = styled.div<{ isDragging: boolean }>`
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex-wrap: wrap;
    padding: 10px;
    margin-bottom: 5px;
    border-radius: 5px;
    background-color: ${(props) => (props.isDragging ? "#74b9ff" : props.theme.cardColor)};
    box-shadow: ${(props) => (props.isDragging ? "0px 2px 5px rgba(0, 0, 0, 0.05)" : "none")};
    span {
        display: block;
        max-width: 80%;
        word-break: break-word;
    }
`;

interface IDragabbleCardProps {
    toDoId: number;
    toDoText: string;
    index: number;
    boardId: string;
}

function DragabbleCard({ toDoId, toDoText, index, boardId }: IDragabbleCardProps) {
    const setToDos = useSetRecoilState(todoBoard);
    const onDelete = () => {
        setToDos((allBoards) => {
            return {
                ...allBoards,
                [boardId]: [...allBoards[boardId].slice(0, index), ...allBoards[boardId].slice(index + 1)],
            };
        });
    };
    return (
        <Draggable draggableId={toDoId + ""} index={index}>
            {(magic, snapshot) => (
                <Card isDragging={snapshot.isDragging} ref={magic.innerRef} {...magic.draggableProps} {...magic.dragHandleProps}>
                    <span>{toDoText}</span>
                    <FontAwesomeIcon
                        icon={faXmark}
                        onClick={onDelete}
                        style={{
                            fontSize: "20px",
                            cursor: "pointer",
                        }}
                    />
                </Card>
            )}
        </Draggable>
    );
}

export default React.memo(DragabbleCard);
