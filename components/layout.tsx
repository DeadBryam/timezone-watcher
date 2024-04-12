import styles from "@/styles/components/layout.module.css";

interface LayoutProps {
  children: React.ReactNode;
}

function Layout(props: LayoutProps): JSX.Element {
  const { children } = props;

  return (
    <div className={styles.layout}>
      <main>{children}</main>
      <footer>
        <p>
          Made with ❤️ by <a href="https://github.com/DeadBryam">DeadBryam</a>
        </p>
      </footer>
    </div>
  );
}

export { Layout };
