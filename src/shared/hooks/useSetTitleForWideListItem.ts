/**
 * @module hooks/useSetTitleForWideListItem
 */

import { useEffect } from 'react';

/**
 * Базовый шрифт
 */
const BASE_FONT = '14px, Roboto, sans-serif';
/**
 * Внутренние отступы (px)
 */
const DEFAULT_PADDINGS = 32; // paddingLeft + paddingRight

/**
 * Функция, определяющая ширину текста (в px) в зависимости от его шрифта
 *
 * @param {string} text текст
 * @param {string} font настройки шрифта
 * @returns {number}
 */
export function getTextWidth(text: string, font: string) {
  const canvas = document.createElement('canvas');
  const context = canvas.getContext('2d');

  if (context) {
    context.font = font;

    const metrics = context.measureText(text);

    return metrics.width;
  }
  return 0;
}

/**
 * Функция, устанавливающая многоточие и атрибут title для списка опций с учетом исключающим массивом строк
 *
 * @param {HTMLDivElement | HTMLUListElement} optionsList контейнер опций
 * @param {string[]} excludeWrappedItems исключающие элементы
 */
function setTitleAndEllipsisToItems(optionsList: HTMLDivElement | HTMLUListElement, excludeWrappedItems: string[]) {
  const list = optionsList.childNodes;
  const optionListWidth = optionsList.getBoundingClientRect().width || parseInt(optionsList.style.width) || 0;

  list.forEach(item => {
    const element = item as Element;
    const params = window.getComputedStyle(element);
    const text = element.textContent || '';
    const padding = parseInt(params.paddingLeft) + parseInt(params.paddingRight) || DEFAULT_PADDINGS;
    const font = params.font || BASE_FONT;
    const width = Math.round(getTextWidth(text, font)) + padding;

    if (width > optionListWidth) {
      if (!excludeWrappedItems.includes(text)) {
        element.setAttribute(
          'style',
          `
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        `
        );
        element.setAttribute('title', text);
      }
    }
  });
}

/**
 * Тип параметров хука useSetTitleForWideListItem
 *
 * @typedef {HookParamsType}
 */
type HookParamsType = {
  /** ref на ul списка */
  wrapperListRef: React.RefObject<HTMLDivElement | HTMLUListElement>;
  /** массив строк с названиями элементов, которым не нужно устанавливать title и ставить троеточие */
  excludeWrappedItems: string[];
};

/**
 * Хук, устанавливающий атрибут title для элементов списка опций (селекта), которые не умещаются по ширине в общем списке
 *
 * @param {HookParamsType} params параметры
 */
export function useSetTitleForWideListItem({ wrapperListRef, excludeWrappedItems }: HookParamsType) {
  useEffect(() => {
    if (wrapperListRef) {
      const optionsList = wrapperListRef.current;

      if (optionsList) {
        setTitleAndEllipsisToItems(optionsList, excludeWrappedItems);
      }
    }
  }, [wrapperListRef, excludeWrappedItems]);
}

/**
 * Тип параметров хука useSetTitleForWideListGroupItem
 *
 * @typedef {HookParamsGroupType}
 */
type HookParamsGroupType = {
  /** ref на ul списка группы */
  wrapperListGroupRef: React.RefObject<HTMLDivElement | HTMLUListElement>;
  /** массив строк с названиями элементов, которым не нужно устанавливать title и ставить троеточие */
  excludeWrappedItems: string[];
  /** массив строк с названиями имен групп, которым не нужно устанавливать title и ставить троеточие */
  excludeWrappedGroupNames: string[];
};

/**
 * Хук, устанавливающий атрибут title для элементов списка опций (группового селекта), которые не умещаются по ширине в общем списке
 *
 * @param {HookParamsGroupType} params параметры
 */
export function useSetTitleForWideListGroupItem({
  wrapperListGroupRef,
  excludeWrappedItems,
  excludeWrappedGroupNames,
}: HookParamsGroupType) {
  useEffect(() => {
    if (wrapperListGroupRef) {
      const optionsGroupList = wrapperListGroupRef.current;

      if (optionsGroupList) {
        const groupsList = optionsGroupList.childNodes;
        const optionGroupListWidth =
          optionsGroupList.getBoundingClientRect().width || parseInt(optionsGroupList.style.width) || 0;

        groupsList.forEach(itemGroup => {
          const group = itemGroup as Element;

          // -----name-----
          const groupParams = window.getComputedStyle(group);
          const groupNameElement = group.firstElementChild;
          const groupNameText = groupNameElement?.textContent || '';
          const groupFont = groupParams.font || BASE_FONT;
          const groupPadding =
            parseInt(groupParams.paddingLeft) + parseInt(groupParams.paddingRight) || DEFAULT_PADDINGS;
          const groupWidth = Math.round(getTextWidth(groupNameText, groupFont)) + groupPadding;

          if (groupNameElement) {
            if (groupWidth > optionGroupListWidth && !excludeWrappedItems.includes(groupNameText)) {
              groupNameElement.setAttribute(
                'style',
                `
                overflow: hidden;
                text-overflow: ellipsis;
                white-space: nowrap;
              `
              );
              groupNameElement.setAttribute('title', groupNameText);
            }

            // -----options-----
            const optionsList = groupNameElement.nextElementSibling;

            if (optionsList) {
              setTitleAndEllipsisToItems(optionsList as HTMLDivElement, excludeWrappedItems);
            }
          }
        });
      }
    }
  }, [wrapperListGroupRef, excludeWrappedItems, excludeWrappedGroupNames]);
}
