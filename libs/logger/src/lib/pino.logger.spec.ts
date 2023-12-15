import { PinoLogger } from './pino.logger';

describe('PinoLogger test suite', () => {
  let pinoLogger: PinoLogger;
  let rootLoggerMock;
  let childLoggerMock;
  beforeEach(() => {
    childLoggerMock = {
      info: jest.fn(),
      error: jest.fn(),
      warn: jest.fn(),
      debug: jest.fn(),
      trace: jest.fn(),
    };
    rootLoggerMock = {
      child: jest.fn().mockReturnValue(childLoggerMock),
    };
    pinoLogger = new PinoLogger(rootLoggerMock);
  });

  it('should create a child logger', () => {
    // Expect
    expect(pinoLogger).toBeDefined();
    expect(rootLoggerMock.child).toHaveBeenCalledTimes(1);
    expect(rootLoggerMock.child).toHaveBeenCalledWith({});
  });

  const levels = [
    ['log', 'info'],
    ['error', 'error'],
    ['warn', 'warn'],
    ['debug', 'debug'],
    ['verbose', 'trace'],
  ];

  describe('should log string message', () => {
    it.each(levels)('with right level: %s', (level, method) => {
      // Prepare
      // Run
      pinoLogger[level]('Log message');

      // Expect
      expect(childLoggerMock[method]).toHaveBeenCalledTimes(1);
      expect(childLoggerMock[method]).toHaveBeenCalledWith({
        msg: 'Log message',
        name: 'Root',
        status: method,
      });
    });

    it.each(levels)('with named logger: %s', (level, method) => {
      // Prepare
      // Run
      pinoLogger[level]('Log message', 'ChildLoggerName');

      // Expect
      expect(childLoggerMock[method]).toHaveBeenCalledTimes(1);
      expect(childLoggerMock[method]).toHaveBeenCalledWith({
        msg: 'Log message',
        name: 'ChildLoggerName',
        status: method,
      });
    });

    it.each(levels)(
      'ignoring optional parameters after logger name: %s',
      (level, method) => {
        // Prepare
        // Run
        pinoLogger[level]('Log message', 'ChildLoggerName', 'Param1', 'Param2');

        // Expect
        expect(childLoggerMock[method]).toHaveBeenCalledTimes(1);
        expect(childLoggerMock[method]).toHaveBeenCalledWith({
          msg: 'Log message',
          name: 'ChildLoggerName',
          status: method,
        });
      }
    );
  });

  describe('should log object message', () => {
    it.each(levels)('with right level: %s', (level, method) => {
      // Prepare
      // Run
      pinoLogger[level]({ msg: 'Log message', param: 'param' });

      // Expect
      expect(childLoggerMock[method]).toHaveBeenCalledTimes(1);
      expect(childLoggerMock[method]).toHaveBeenCalledWith({
        msg: 'Log message',
        param: 'param',
        name: 'Root',
        status: method,
      });
    });

    it.each(levels)('with child logger name: %s', (level, method) => {
      // Prepare
      // Run
      pinoLogger[level](
        { msg: 'Log message', param: 'param' },
        'ChildLoggerName'
      );

      // Expect
      expect(childLoggerMock[method]).toHaveBeenCalledTimes(1);
      expect(childLoggerMock[method]).toHaveBeenCalledWith({
        msg: 'Log message',
        param: 'param',
        name: 'ChildLoggerName',
        status: method,
      });
    });
  });
});
