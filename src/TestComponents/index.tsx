import { FC } from "react";

import styled from "styled-components/native";

import { TestTextPropsType } from "./types";

export const TestComponent: FC<TestTextPropsType> = ({
  title = "Default text...",
  ...props
}) => <DefaultText {...props}>{title}</DefaultText>;
TestComponent.displayName = "TestComponent";

const DefaultText = styled.Text`
  color: blue;
`;