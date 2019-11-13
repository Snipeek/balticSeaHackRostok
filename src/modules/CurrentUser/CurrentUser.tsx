import gql from "graphql-tag";
import { useProfileQuery} from "@/queries/ProfileQuery";

const query = gql`
    query profile{
        profile{
            login,
            balance,
        }
    }
`;

export const CurrentUser = (props: any) => {
    // useProfileQuery(query, {
    //     errorPolicy: "ignore",
    // });
    return props.children;
}
