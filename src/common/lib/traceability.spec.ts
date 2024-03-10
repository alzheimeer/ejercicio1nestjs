import Traceability from './traceability';
import { Test, TestingModule } from '@nestjs/testing';
import generalConfig from 'src/common/configuration/general.config';
import { EStatusTracingGeneral } from 'src/common/utils/enums/tracing.enum';
import { ETaskMessageGeneral } from 'src/common/utils/enums/message.enum';



describe('Traceability Class', () => {
  let service: Traceability;

  beforeEach(() => {
    service = new Traceability({});
  });

  it('should return LEGACY_SUCCESS when result status is 200', () => {
    const result = { executed: true, status: 200 };
    const statusTraceability = Traceability.getStatusTraceability(result);
    expect(statusTraceability).toEqual(EStatusTracingGeneral.LEGACY_SUCCESS);
  });

  it('should return LEGACY_SUCCESS when result status is 201', () => {
    const result = { executed: true, status: 201 };
    const statusTraceability = Traceability.getStatusTraceability(result);
    expect(statusTraceability).toEqual(EStatusTracingGeneral.LEGACY_SUCCESS);
  });

  it('should return LEGACY_WARN when result status is not 200 or 201', () => {
    const result = { executed: true, status: 400 };
    const statusTraceability = Traceability.getStatusTraceability(result);
    expect(statusTraceability).toEqual(EStatusTracingGeneral.LEGACY_WARN);
  });

  it('should return LEGACY_ERROR when result is not executed', () => {
    const result = { executed: false };
    const statusTraceability = Traceability.getStatusTraceability(result);
    expect(statusTraceability).toEqual(EStatusTracingGeneral.LEGACY_ERROR);
  });
});