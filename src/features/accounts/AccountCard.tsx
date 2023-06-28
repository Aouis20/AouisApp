import { Card, createStyles, CSSObject } from '@mantine/core';

type AccountCardProps = {
  children: React.ReactNode;
  sx?: CSSObject;
};

const accountCardStyle = createStyles((theme) => ({
  card: {
    borderRadius: '8px',
    border: `1px solid ${theme.colors.gray[2]}`,
    boxShadow: `2px 2px 1px 1px ${theme.colors.gray[1]}`
  }
}));

export const AccountCard = ({ children, sx }: AccountCardProps) => {
  const { classes } = accountCardStyle();

  return (
    <Card sx={sx} className={classes.card}>
      {children}
    </Card>
  );
};
