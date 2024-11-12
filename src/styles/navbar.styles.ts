import { styled } from 'styled-components';

interface BurgerButtonProps {
  open?: boolean; // Allow 'open' prop, default to undefined
}

export const SidebarWrapper = styled.div`
  overflow: hidden;
  height: 100vh;
  display: flex;
`;

export const StyledBurgerButton = styled.button<BurgerButtonProps>`
  position: absolute;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  width: 22px;
  height: 22px;
  background: transparent;
  border: none;
  cursor: pointer;
  padding: 0;
  z-index: 202;

  &:focus {
    outline: none;
  }

  & div {
    width: 22px;
    height: 1px;
    background: ${({ theme }) => theme.accents9 || '#333'}; // Use theme or fallback
    border-radius: 10px;
    transition: all 0.3s ease;
    position: relative;
    transform-origin: 1px;

    &:first-child {
      transform: translateY(-4px) rotate(0deg);
      height: 1px;
      margin-top: 10px;
    }

    &:nth-child(2) {
      transform: translateY(4px) rotate(0deg);
      height: 1px;
      margin-bottom: 10px;
    }
  }

  /* Handle open prop */
  ${({ open }) =>
    open &&
    `
    & div {
      &:first-child {
        margin-top: 0px;
        transform: translateY(1px) rotate(45deg);
      }
      &:nth-child(2) {
        margin-bottom: 0px;
        transform: translateY(4px) rotate(-45deg);
      }
    }
  `}
`;
