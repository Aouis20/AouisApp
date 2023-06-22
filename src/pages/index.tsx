import { Button, Container, Text, Title, createStyles } from "@mantine/core";
import { HeaderSection } from "../common/Header";

const useStyles = createStyles((theme) => ({
  container: {
    border: '1px solid red'
  },

}));

export default function Home() {
  const { classes } = useStyles()
  
  return (
    <>
      <HeaderSection />
      <Container size={"2xl"} className={classes.container}>
        <Text>
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Reprehenderit, iste asperiores! Placeat repudiandae, incidunt laborum quae amet dignissimos quod illum ullam odit eos veritatis nesciunt perferendis eveniet ea animi ipsa.
          Beatae quia sint facilis molestias expedita rem harum mollitia, tempore ex nesciunt perspiciatis dicta sapiente quibusdam error unde corrupti aspernatur nostrum hic perferendis ab exercitationem reiciendis magni? Obcaecati, dicta enim?
        </Text>
      </Container>
    </>
  );
}
