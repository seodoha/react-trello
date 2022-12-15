import { Draggable } from "react-beautiful-dnd";
import styled from "styled-components";
import React from "react";

const Card = styled.div`
    padding: 10px;
    margin-bottom: 5px;
    border-radius: 5px;
    background-color: ${(props) => props.theme.cardColor};
`;

interface IDragabbleCardProps {
    todo: string;
    index: number;
}

function DragabbleCard({ todo, index }: IDragabbleCardProps) {
    console.log(todo, "has been rendered");

    return (
        <Draggable key={todo} draggableId={todo} index={index}>
            {(magic) => (
                <Card ref={magic.innerRef} {...magic.draggableProps} {...magic.dragHandleProps}>
                    {todo}
                </Card>
            )}
        </Draggable>
    );
}

export default React.memo(DragabbleCard);
