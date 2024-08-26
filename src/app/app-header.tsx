import Link from '@mui/material/Link';
import classNames from 'classnames';
import { ChangeEvent } from 'react';
import { useMatch, useNavigate } from 'react-router-dom';
import { green } from '@mui/material/colors';
import styled from 'styled-components';

export interface MainMenuLink {
  title: string;
  path: string;
}

const HeaderStyle = styled.div`
  padding: 1rem;
  border-bottom: 1px solid #eee;
  margin-bottom: 0;

  .main-menu {
    .MuiLink-root {
      margin-right: 1rem;
    }
  }

  .MainMenuLinkElement {
    &__active, &:hover:not(.MainMenuLinkElement__active) {
      position: relative;
      color: ${green['500']};

      &:after {
        content: '';
        position: absolute;;
        left: 0;
        right: 0;
        height: .2rem;
        bottom: -1.1rem;
        background: ${green['300']};
      }
    }

    &__active {
      color: ${green['700']};

      &:after {
        background: ${green['500']};
      }
    }
  }
`;

function MainMenuLinkElement({
  path,
  title,
}: {
  isTryOnMode?: boolean;
  path: string;
  title: string;
}) {
  const navigate = useNavigate();
  const isActive = useMatch(`${path}/*`);

  return (
    <Link
      className={classNames({
        MainMenuLinkElement: true,
        MainMenuLinkElement__active: isActive,
      })}
      key={path}
      color="gray"
      underline="none"
      variant="body2"
      href={path}
      onClick={() => navigate(path, { replace: true })}
      role="menuitem"
    >
      {title}
    </Link>
  );
}

function MainMenu({ links }: { links: MainMenuLink[] }) {
  return (
    <div className="main-menu">
      {links.map((link) => (
        <MainMenuLinkElement key={link.path} {...link} />
      ))}
    </div>
  );
}

export function AppHeader({ links }: { links: MainMenuLink[] }) {
  return (
    <HeaderStyle role="navigation" aria-label="Main">
      {links.length ? <MainMenu links={links} /> : ''}
    </HeaderStyle>
  );
}
