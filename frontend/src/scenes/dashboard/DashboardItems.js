import './DashboardItems.scss'

import React, { useEffect, useState } from 'react'
import { useActions, useValues } from 'kea'
import RGL, { WidthProvider } from 'react-grid-layout'

import DashboardItem from 'scenes/dashboard/DashboardItem'
import { triggerResizeAfterADelay } from 'lib/utils'

const ReactGridLayout = WidthProvider(RGL)

export function DashboardItems({ logic }) {
    const { items } = useValues(logic)
    const { loadDashboardItems, renameDashboardItem } = useActions(logic)
    const [colors, setColors] = useState({})

    const [layout, setLayout] = useState(
        items.map((item, index) => ({
            i: `${item.id}`,
            x: index % 2 === 0 ? 0 : 6,
            y: Math.floor(index / 2),
            w: 6,
            h: 5,
        }))
    )

    // make sure the dashboard takes up the right size
    useEffect(() => triggerResizeAfterADelay(), [])

    const defaultProps = {
        className: 'layout',
        items: 20,
        rowHeight: 50,
        cols: 12,
        margin: [20, 20],
        containerPadding: [0, 0],
    }

    return (
        <ReactGridLayout
            className="layout"
            layout={layout}
            onLayoutChange={setLayout}
            draggableCancel=".anticon,.ant-dropdown"
            {...defaultProps}
        >
            {items.map(item => (
                <div key={item.id} className={`dashboard-item ${colors[item.id] || ''}`}>
                    <DashboardItem
                        key={item.id}
                        item={item}
                        loadDashboardItems={loadDashboardItems}
                        renameDashboardItem={renameDashboardItem}
                        colors={colors}
                        setColors={setColors}
                    />
                </div>
            ))}
        </ReactGridLayout>
    )
}
