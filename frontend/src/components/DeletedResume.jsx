import { Box, Heading, Button } from '@chakra-ui/react'
import { CheckCircleIcon } from '@chakra-ui/icons'
import { Link } from 'react-router-dom'

export default function DeletedResume() {
    return (
        <Box textAlign="center" py={10} px={6}>
            <CheckCircleIcon boxSize={'50px'} color={'green.500'} />
            <Heading as="h2" size="xl" mt={6} mb={2}>
                Resume Data is Deleted
            </Heading>

            <Link to={"/create-resume"}>
                <Button
                    colorScheme="teal"
                    bgGradient="linear(to-r, teal.400, teal.500, teal.600)"
                    color="white"
                    variant="solid">
                    Add Resume
                </Button>
            </Link>


        </Box>
    )
}