import { Trans } from '@lingui/macro'
import { useAtomValue } from 'jotai/utils'
import { useUpdateAtom } from 'jotai/utils'
import styled, { ThemedText } from 'lib/theme'
import { pickAtom } from 'lib/utils/atoms'
import { ReactNode } from 'react'

import Column from '../Column'
import Row from '../Row'
import { inputAtom, State, stateAtom } from './state'
import TokenInput from './TokenInput'

const InputColumn = styled(Column)<{ approved: boolean }>`
  padding: 0.75em;
  position: relative;

  img {
    filter: ${({ approved }) => (approved ? undefined : 'saturate(0) opacity(0.6)')};
  }
`

export default function Input({ children }: { children: ReactNode }) {
  const input = useAtomValue(inputAtom)
  const setValue = useUpdateAtom(pickAtom(inputAtom, 'value'))
  const setToken = useUpdateAtom(pickAtom(inputAtom, 'token'))
  const state = useAtomValue(stateAtom)
  const balance = 123.45

  return (
    <InputColumn gap={0.5} approved={state !== State.TOKEN_APPROVAL}>
      <Row>
        <ThemedText.Subhead2 color="secondary">
          <Trans>Trading</Trans>
        </ThemedText.Subhead2>
      </Row>
      <TokenInput
        input={input}
        onMax={balance ? () => setValue(balance) : undefined}
        onChangeInput={setValue}
        onChangeToken={setToken}
      >
        <ThemedText.Body2 color="secondary">
          <Row>
            {input.usdc ? `~ $${input.usdc.toLocaleString('en')}` : '-'}
            {balance && (
              <Row gap={0.5}>
                <Row gap={0.25} color={state === State.BALANCE_INSUFFICIENT ? 'error' : undefined}>
                  Balance: {balance}
                </Row>
              </Row>
            )}
          </Row>
        </ThemedText.Body2>
      </TokenInput>
      <Row />
      {children}
    </InputColumn>
  )
}