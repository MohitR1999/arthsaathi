import { Components } from "@arthsaathi/ui";
import { Text } from 'react-native-paper';

const SignedIn = () => {
    return (
        <Components.SafeLayout>
            <Text>
                Hello user!
            </Text>
        </Components.SafeLayout>
    )
}

export default SignedIn