import { Button, Container, Text, Title, createStyles } from "@mantine/core";
import { HeaderSection } from "../common/Header";

const useStyles = createStyles((theme) => ({
  container: {
  },

}));

export default function Home() {
  const { classes } = useStyles()
  return (
    <>
      <HeaderSection />
      <Title>Aouis</Title>
      <Container size={"2xl"} className={classes.container}>
        <Text>azeaz</Text>
        <Button>test</Button>
      </Container>
    </>
  );
}
