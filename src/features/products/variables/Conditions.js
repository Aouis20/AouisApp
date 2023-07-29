import { IconStarFilled, IconThumbDown, IconThumbDownFilled, IconThumbUp, IconThumbUpFilled } from "@tabler/icons-react";
import { ConditionType } from "../types/Product";


export const conditionIcon = {
  [ConditionType.MINT]: <IconStarFilled size={16} />,
  [ConditionType.EXCELLENT]: <IconThumbUpFilled size={16} />,
  [ConditionType.GOOD]: <IconThumbUp size={16} />,
  [ConditionType.FAIR]: <IconThumbDown size={16} />,
  [ConditionType.POOR]: <IconThumbDownFilled size={16} />,
};