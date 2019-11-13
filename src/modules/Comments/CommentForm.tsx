import * as React from "react";
import {Form} from "@/modules/Form/Form";
import {Textarea} from "@/components/Textarea/Textarea";

export const CommentForm = () => {
    return(
        <Form
            initialValues={{
                comment: "",
            }}
            onSubmit={() => {}}
        >
            {({ controlDecorator }) => (
                <div>
                    {controlDecorator({ name: "comment"}, <Textarea
                        placeholder="Place for comments"
                    />)}
                </div>
            )}
        </Form>
    );
}