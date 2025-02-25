import { QuartzComponent, QuartzComponentConstructor, QuartzComponentProps } from "../types"

interface TestComponentOptions {
  text?: string
}

const defaultOptions: TestComponentOptions = {
  text: "This is a test component"
}

export default ((opts?: Partial<TestComponentOptions>) => {
  const TestComponent: QuartzComponent = ({ displayClass }: QuartzComponentProps) => {
    const options = { ...defaultOptions, ...opts }

    return (
      <div className={`${displayClass ?? ""} test-component`} style={{
        backgroundColor: 'red',
        color: 'white',
        padding: '20px',
        margin: '20px 0',
        borderRadius: '8px',
        textAlign: 'center'
      }}>
        <h2>Test Component</h2>
        <p>{options.text}</p>
      </div>
    )
  }

  return TestComponent
}) satisfies QuartzComponentConstructor