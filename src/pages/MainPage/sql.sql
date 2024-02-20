SET SERVEROUTPUT ON;


Создать процедуру, копирующую строки с информацией об участках, нарядов на которые в указанном месяце не было, во вспомогательную таблицу. Вывести количество таких участков.
......................................................................................................................
CREATE OR REPLACE PROCEDURE WorkStatsForTechnic(
    p_technic_id IN NUMBER,
    p_start_date IN DATE,
    p_end_date IN DATE
) AS
    CURSOR c_work_stats IS
        SELECT a.id_accounting_works, t.title
        FROM Accountin_works a
        JOIN Types_repairs t ON a.id_type_repair = t.id_type_repair
        WHERE a.id_technic = p_technic_id
        AND a.repair_start_date BETWEEN p_start_date AND p_end_date
        AND a.repair_completion_date BETWEEN p_start_date AND p_end_date;

    v_work_id NUMBER;
    v_work_description VARCHAR2(255);
    v_work_count NUMBER := 0;
BEGIN
    DBMS_OUTPUT.PUT_LINE('Перечень выполненных работ для техники ' || p_technic_id || ' за период с ' || p_start_date || ' по ' || p_end_date || ':');

    -- Открытие курсора
    OPEN c_work_stats;

    -- Получение данных из курсора и вывод перечня работ
    LOOP
        FETCH c_work_stats INTO v_work_id, v_work_description;
        EXIT WHEN c_work_stats%NOTFOUND;
        DBMS_OUTPUT.PUT_LINE('Выполнена работа ' || v_work_id || ': ' || v_work_description);
        v_work_count := v_work_count + 1;
    END LOOP;

    -- Закрытие курсора
    CLOSE c_work_stats;

    -- Вывод количества работ
    DBMS_OUTPUT.PUT_LINE('Количество выполненных работ: ' || v_work_count);
EXCEPTION
    WHEN NO_DATA_FOUND THEN
        DBMS_OUTPUT.PUT_LINE('Данные не найдены');
    WHEN OTHERS THEN
        DBMS_OUTPUT.PUT_LINE('Произошла ошибка: ' || SQLERRM);
END WorkStatsForTechnic;

BEGIN
    WorkStatsForTechnic(3, TO_DATE('2023-01-01', 'YYYY-MM-DD'), TO_DATE('2023-12-31', 'YYYY-MM-DD'));
END;



Создать функцию, возвращающую количество работников, которые получили наименьшее количество нарядов до указанной в параметре даты. Вывести более подробную информацию об этих работниках.
......................................................................................................................

CREATE OR REPLACE FUNCTION Workers_with_min_tasks (data_day DATE)RETURN NUMBER IS --------------------------- сделать To_date 
 CURSOR cur_workers IS
   select workers.id_workers,workers.full_name, workers.address,workers.tel_no,workers.date_birth,workers.id_positions,workers.passport_number
   FROM workers
   INNER JOIN schedule ON workers.id_workers = schedule.id_worker
   INNER JOIN tasks ON  schedule.id_task = tasks.id_tasks
   WHERE tasks.start_time < data_day
   group by workers.id_workers,workers.full_name, workers.address,workers.tel_no,workers.date_birth,workers.id_positions,workers.passport_number
   order by COUNT(id_workers)
   fetch first rows with ties;
info cur_workers%ROWTYPE;
BEGIN
  OPEN cur_workers;
  LOOP 
    FETCH cur_workers INTO info;
    EXIT WHEN cur_workers%NOTFOUND;
    DBMS_OUTPUT.PUT_LINE('id worker - ' || info.id_workers);
    DBMS_OUTPUT.PUT_LINE('full name - ' || info.full_name);
    DBMS_OUTPUT.PUT_LINE('address - '|| info.address);
    DBMS_OUTPUT.PUT_LINE('phone number - ' ||info.tel_no);
    DBMS_OUTPUT.PUT_LINE('date of birth - ' ||info.date_birth);
    DBMS_OUTPUT.PUT_LINE('id_position - ' ||info.id_positions);
    DBMS_OUTPUT.PUT_LINE('passport number - '|| info.passport_number);
    DBMS_OUTPUT.PUT_LINE('---------------------------------------------');
  END LOOP; 
    IF cur_workers%ROWCOUNT = 0 THEN RAISE NO_DATA_FOUND; END IF;
  RETURN cur_workers%ROWCOUNT;
  EXCEPTION
  WHEN NO_DATA_FOUND THEN DBMS_OUTPUT.PUT_LINE('No data found!'); RETURN NULL;
  CLOSE cur_workers;
END;
/




ВЫЗОВ ФУНКЦИИ 

BEGIN
   DBMS_OUTPUT.PUT_LINE(Workers_with_min_tasks(TO_DATE('15/09/2023','DD.MM.YYYY')));
END;
/



Локальная программа
......................................................................................................................
CREATE OR REPLACE FUNCTION Workers_with_min_tasks_with_local (data_day DATE)RETURN NUMBER IS
 CURSOR cur_workers IS
   select workers.id_workers,workers.full_name, workers.address,workers.tel_no,workers.date_birth,workers.id_positions,workers.passport_number
   FROM workers
   INNER JOIN schedule ON workers.id_workers = schedule.id_worker
   INNER JOIN tasks ON  schedule.id_task = tasks.id_tasks
   WHERE tasks.start_time < data_day
   group by workers.id_workers,workers.full_name, workers.address,workers.tel_no,workers.date_birth,workers.id_positions,workers.passport_number
   order by COUNT(id_workers)
   fetch first rows with ties;
info cur_workers%ROWTYPE;
PROCEDURE Input(cur_info cur_workers%ROWTYPE) IS
BEGIN
    DBMS_OUTPUT.PUT_LINE('id worker - ' || info.id_workers);
    DBMS_OUTPUT.PUT_LINE('full name - ' || info.full_name);
    DBMS_OUTPUT.PUT_LINE('address - '|| info.address);
    DBMS_OUTPUT.PUT_LINE('phone number - ' ||info.tel_no);
    DBMS_OUTPUT.PUT_LINE('date of birth - ' ||info.date_birth);
    DBMS_OUTPUT.PUT_LINE('id_position - ' ||info.id_positions);
    DBMS_OUTPUT.PUT_LINE('passport number - '|| info.passport_number);
    DBMS_OUTPUT.PUT_LINE('---------------------------------------------'); 
END Input; 
BEGIN
  OPEN cur_workers;
  LOOP 
    FETCH cur_workers INTO info;
    EXIT WHEN cur_workers%NOTFOUND;
    Input(info);
  END LOOP; 
  IF cur_workers%ROWCOUNT = 0 THEN RAISE NO_DATA_FOUND; END IF;
  RETURN cur_workers%ROWCOUNT;
  EXCEPTION
  WHEN NO_DATA_FOUND THEN DBMS_OUTPUT.PUT_LINE('No data found!'); RETURN NULL;
  CLOSE cur_workers;
END;
/



BEGIN
   DBMS_OUTPUT.PUT_LINE(Workers_with_min_tasks_with_local(TO_DATE('15/09/2023','DD.MM.YYYY')));
END;



Перегруженная программа 
Создать функцию, возвращающую количество работников, которые получили наибольшее количество нарядов по профессии. Вывести более подробную информацию об этих работниках.
......................................................................................................................
CREATE OR REPLACE FUNCTION Workers_with_min_tasks (pos VARCHAR2)RETURN NUMBER IS
 CURSOR cur_workers IS
   select workers.id_workers,workers.full_name, workers.address,workers.tel_no,workers.date_birth,workers.id_positions,workers.passport_number
   FROM workers
   INNER JOIN positions ON workers.id_positions = positions.id_positions
   INNER JOIN schedule ON workers.id_workers = schedule.id_worker
   INNER JOIN tasks ON  schedule.id_task = tasks.id_tasks
   WHERE positions.title_position = pos
   group by workers.id_workers,workers.full_name, workers.address,workers.tel_no,workers.date_birth,workers.id_positions,workers.passport_number
   order by COUNT(id_workers) desc
   fetch first rows with ties;
info cur_workers%ROWTYPE;
BEGIN
  OPEN cur_workers;
  LOOP 
    FETCH cur_workers INTO info;
    EXIT WHEN cur_workers%NOTFOUND;
    DBMS_OUTPUT.PUT_LINE('id worker - ' || info.id_workers);
    DBMS_OUTPUT.PUT_LINE('full name - ' || info.full_name);
    DBMS_OUTPUT.PUT_LINE('address - '|| info.address);
    DBMS_OUTPUT.PUT_LINE('phone number - ' ||info.tel_no);
    DBMS_OUTPUT.PUT_LINE('date of birth - ' ||info.date_birth);
    DBMS_OUTPUT.PUT_LINE('id_position - ' ||info.id_positions);
    DBMS_OUTPUT.PUT_LINE('passport number - '|| info.passport_number);
    DBMS_OUTPUT.PUT_LINE('---------------------------------------------');
  END LOOP; 
    IF cur_workers%ROWCOUNT = 0 THEN RAISE NO_DATA_FOUND; END IF;
  RETURN cur_workers%ROWCOUNT;
  EXCEPTION
  WHEN NO_DATA_FOUND THEN DBMS_OUTPUT.PUT_LINE('No data found!'); RETURN NULL;
  CLOSE cur_workers;
END;
/

BEGIN
   DBMS_OUTPUT.PUT_LINE(Workers_with_min_tasks('Дворник'));
END;
/




Объединить все процедуры и функции, в том числе перегруженные, в пакет.
......................................................................................................................

CREATE OR REPLACE PACKAGE package_lab4 IS

  PROCEDURE Quantity_areas (month_num NUMBER)
  FUNCTION Workers_with_min_tasks (data_day DATE)RETURN NUMBER
  FUNCTION Workers_with_min_tasks_with_local (data_day DATE)RETURN NUMBER
  FUNCTION Workers_with_min_tasks (pos VARCHAR2)RETURN NUMBER
END package_lab4;


......................................................................................................................
CREATE OR REPLACE PACKAGE BODY package_lab4 IS
PROCEDURE Quantity_areas (month_num NUMBER) IS
  CURSOR cur_areas IS
    SELECT areas.title_area,areas.id_areas
    FROM areas 
    LEFT JOIN tasks ON tasks.id_area = areas.id_areas
    AND TO_CHAR(tasks.start_time,'mm') = month_num
    WHERE tasks.id_area is NULL;
    
  info cur_areas%ROWTYPE;
  my_exception EXCEPTION;
BEGIN
  IF month_num > 12 or month_num < 1 THEN RAISE my_exception; END IF;
  delete from auxiliary_table;
  OPEN cur_areas;
  LOOP
    FETCH cur_areas INTO info;
    EXIT WHEN cur_areas%NOTFOUND;
    DBMS_OUTPUT.PUT_LINE('Title areas: ' || info.title_area);
    insert into auxiliary_table values(info.id_areas,info.title_area);
  END LOOP;
  DBMS_OUTPUT.PUT_LINE('Count: ' || cur_areas%ROWCOUNT);
  CLOSE cur_areas;
EXCEPTION
  WHEN my_exception THEN
    DBMS_OUTPUT.PUT_LINE('The month is entered incorrectly!');
END;



FUNCTION Workers_with_min_tasks (data_day DATE)RETURN NUMBER IS
 CURSOR cur_workers IS
   select workers.id_workers,workers.full_name, workers.address,workers.tel_no,workers.date_birth,workers.id_positions,workers.passport_number
   FROM workers
   INNER JOIN schedule ON workers.id_workers = schedule.id_worker
   INNER JOIN tasks ON  schedule.id_task = tasks.id_tasks
   WHERE tasks.start_time < data_day
   group by workers.id_workers,workers.full_name, workers.address,workers.tel_no,workers.date_birth,workers.id_positions,workers.passport_number
   order by COUNT(id_workers)
   fetch first rows with ties;
info cur_workers%ROWTYPE;
BEGIN
  OPEN cur_workers;
  LOOP 
    FETCH cur_workers INTO info;
    EXIT WHEN cur_workers%NOTFOUND;
    DBMS_OUTPUT.PUT_LINE('id worker - ' || info.id_workers);
    DBMS_OUTPUT.PUT_LINE('full name - ' || info.full_name);
    DBMS_OUTPUT.PUT_LINE('address - '|| info.address);
    DBMS_OUTPUT.PUT_LINE('phone number - ' ||info.tel_no);
    DBMS_OUTPUT.PUT_LINE('date of birth - ' ||info.date_birth);
    DBMS_OUTPUT.PUT_LINE('id_position - ' ||info.id_positions);
    DBMS_OUTPUT.PUT_LINE('passport number - '|| info.passport_number);
    DBMS_OUTPUT.PUT_LINE('---------------------------------------------');
  END LOOP; 
    IF cur_workers%ROWCOUNT = 0 THEN RAISE NO_DATA_FOUND; END IF;
  RETURN cur_workers%ROWCOUNT;
  EXCEPTION
  WHEN NO_DATA_FOUND THEN DBMS_OUTPUT.PUT_LINE('No data found!'); RETURN NULL;
  CLOSE cur_workers;
END;



FUNCTION Workers_with_min_tasks_with_local (data_day DATE)RETURN NUMBER IS
 CURSOR cur_workers IS
   select workers.id_workers,workers.full_name, workers.address,workers.tel_no,workers.date_birth,workers.id_positions,workers.passport_number
   FROM workers
   INNER JOIN schedule ON workers.id_workers = schedule.id_worker
   INNER JOIN tasks ON  schedule.id_task = tasks.id_tasks
   WHERE tasks.start_time < data_day
   group by workers.id_workers,workers.full_name, workers.address,workers.tel_no,workers.date_birth,workers.id_positions,workers.passport_number
   order by COUNT(id_workers)
   fetch first rows with ties;
info cur_workers%ROWTYPE;
PROCEDURE Input(cur_info cur_workers%ROWTYPE) IS
BEGIN
    DBMS_OUTPUT.PUT_LINE('id worker - ' || info.id_workers);
    DBMS_OUTPUT.PUT_LINE('full name - ' || info.full_name);
    DBMS_OUTPUT.PUT_LINE('address - '|| info.address);
    DBMS_OUTPUT.PUT_LINE('phone number - ' ||info.tel_no);
    DBMS_OUTPUT.PUT_LINE('date of birth - ' ||info.date_birth);
    DBMS_OUTPUT.PUT_LINE('id_position - ' ||info.id_positions);
    DBMS_OUTPUT.PUT_LINE('passport number - '|| info.passport_number);
    DBMS_OUTPUT.PUT_LINE('---------------------------------------------'); 
END Input; 
BEGIN
  OPEN cur_workers;
  LOOP 
    FETCH cur_workers INTO info;
    EXIT WHEN cur_workers%NOTFOUND;
    Input(info);
  END LOOP; 
  IF cur_workers%ROWCOUNT = 0 THEN RAISE NO_DATA_FOUND; END IF;
  RETURN cur_workers%ROWCOUNT;
  EXCEPTION
  WHEN NO_DATA_FOUND THEN DBMS_OUTPUT.PUT_LINE('No data found!'); RETURN NULL;
  CLOSE cur_workers;
END;




FUNCTION Workers_with_min_tasks (pos VARCHAR2)RETURN NUMBER IS
 CURSOR cur_workers IS
   select workers.id_workers,workers.full_name, workers.address,workers.tel_no,workers.date_birth,workers.id_positions,workers.passport_number
   FROM workers
   INNER JOIN positions ON workers.id_positions = positions.id_positions
   INNER JOIN schedule ON workers.id_workers = schedule.id_worker
   INNER JOIN tasks ON  schedule.id_task = tasks.id_tasks
   WHERE positions.title_position = pos
   group by workers.id_workers,workers.full_name, workers.address,workers.tel_no,workers.date_birth,workers.id_positions,workers.passport_number
   order by COUNT(id_workers) desc
   fetch first rows with ties;
info cur_workers%ROWTYPE;
BEGIN
  OPEN cur_workers;
  LOOP 
    FETCH cur_workers INTO info;
    EXIT WHEN cur_workers%NOTFOUND;
    DBMS_OUTPUT.PUT_LINE('id worker - ' || info.id_workers);
    DBMS_OUTPUT.PUT_LINE('full name - ' || info.full_name);
    DBMS_OUTPUT.PUT_LINE('address - '|| info.address);
    DBMS_OUTPUT.PUT_LINE('phone number - ' ||info.tel_no);
    DBMS_OUTPUT.PUT_LINE('date of birth - ' ||info.date_birth);
    DBMS_OUTPUT.PUT_LINE('id_position - ' ||info.id_positions);
    DBMS_OUTPUT.PUT_LINE('passport number - '|| info.passport_number);
    DBMS_OUTPUT.PUT_LINE('---------------------------------------------');
  END LOOP; 
    IF cur_workers%ROWCOUNT = 0 THEN RAISE NO_DATA_FOUND; END IF;
  RETURN cur_workers%ROWCOUNT;
  EXCEPTION
  WHEN NO_DATA_FOUND THEN DBMS_OUTPUT.PUT_LINE('No data found!'); RETURN NULL;
  CLOSE cur_workers;
END;



END package_lab4;/



АНОНИМНЫЙ БЛОК
......................................................................................................................
BEGIN
 package_lab4.Quantity_areas(8); 
 package_lab4.Quantity_areas(13);
 DBMS_OUTPUT.PUT_LINE(package_lab4.Workers_with_min_tasks(TO_DATE('15/09/2023','DD.MM.YYYY')));
 DBMS_OUTPUT.PUT_LINE(package_lab4.Workers_with_min_tasks(TO_DATE('15/09/2020','DD.MM.YYYY')));
 DBMS_OUTPUT.PUT_LINE(package_lab4.Workers_with_min_tasks('Дворник'));
 DBMS_OUTPUT.PUT_LINE(package_lab4.Workers_with_min_tasks('Строитель'));
END;
/









CREATE OR REPLACE PROCEDURE WorkStatsForTechnic(
    p_technic_id IN NUMBER,
    p_start_date IN DATE,
    p_end_date IN DATE,
    p_repair_type_id IN NUMBER
) AS
    v_work_count NUMBER := 0;
    my_exception EXCEPTION;
BEGIN
    DBMS_OUTPUT.PUT_LINE('Для техники ' || p_technic_id || ' с ' || p_start_date || ' по ' || p_end_date);
    
    -- Очищаем временную таблицу перед началом
    DELETE FROM Temp_WorkStats;
    
    -- Проверяем существование типа ремонта
    SELECT COUNT(*)
    INTO v_work_count
    FROM Types_repairs
    WHERE id_type_repair = p_repair_type_id;
    
    IF v_work_count = 0 THEN
        RAISE my_exception;
    END IF;
    
    -- Итерируем по результатам запроса
    FOR r IN (
        SELECT a.id_accounting_works, t.title
        FROM Accountin_works a
        JOIN Types_repairs t ON a.id_type_repair = t.id_type_repair
        WHERE a.id_technic = p_technic_id
        AND a.repair_start_date BETWEEN p_start_date AND p_end_date
        AND a.repair_completion_date BETWEEN p_start_date AND p_end_date
        AND a.id_type_repair = p_repair_type_id
    ) LOOP
        v_work_count := v_work_count + 1;
        
        -- Заносим результаты во временную таблицу
        INSERT INTO Temp_WorkStats (work_id, work_description)
        VALUES (r.id_accounting_works, r.title);
    END LOOP;
    
    -- Выводим количество работ в DBMS_OUTPUT
    DBMS_OUTPUT.PUT_LINE('Количество работ: ' || v_work_count);
    
    -- Выводим перечень выполненных работ
    FOR r IN (SELECT * FROM Temp_WorkStats) LOOP
        DBMS_OUTPUT.PUT_LINE('Выполнена работа ' || r.work_id || ': ' || r.work_description); 
    END LOOP;
EXCEPTION
    WHEN NO_DATA_FOUND THEN
        DBMS_OUTPUT.PUT_LINE('Данные не найдены!');
    WHEN my_exception THEN
        DBMS_OUTPUT.PUT_LINE('Переданный тип ремонта не существует');
    WHEN OTHERS THEN
        DBMS_OUTPUT.PUT_LINE('Произошла ошибка: ' || SQLERRM);
END WorkStatsForTechnic;

BEGIN
  WorkStatsForTechnic(3, TO_DATE('2023-01-01', 'YYYY-MM-DD'), TO_DATE('2023-12-31', 'YYYY-MM-DD'),1);
END;



CREATE OR REPLACE PACKAGE RepairPackage AS
    -- Функция для определения количества техники в ремонте и вывода информации
    FUNCTION EquipmentInRepairFunction RETURN NUMBER;

    -- Процедура для вывода списка выполненных работ для техники за период времени
    PROCEDURE WorkStatsForTechnic(
        p_technic_id IN NUMBER,
        p_start_date IN DATE,
        p_end_date IN DATE
    );

    -- Перегруженная процедура для вывода списка выполненных работ для техники за период времени с фильтрацией по типу ремонта
    PROCEDURE WorkStatsForTechnic(
        p_technic_id IN NUMBER,
        p_start_date IN DATE,
        p_end_date IN DATE,
        p_repair_type_id IN NUMBER
    );

    -- Локальная программа для определения количества техники в ремонте
    FUNCTION EquipmentInRepair RETURN NUMBER;
END RepairPackage;





CREATE OR REPLACE PACKAGE BODY RepairPackage AS
    -- Функция для определения количества техники в ремонте и вывода информации
  FUNCTION EquipmentInRepairFunction
RETURN NUMBER
IS
    v_count NUMBER := 0;
    v_title VARCHAR2(255);
    v_repair_completion_date DATE;
    v_cursor SYS_REFCURSOR;
BEGIN
    OPEN v_cursor FOR
        SELECT t.title, a.repair_completion_date
        FROM Accountin_works a
        JOIN Technics t ON a.id_technic = t.id_technik
        WHERE a.repair_start_date <= SYSDATE AND a.repair_completion_date >= SYSDATE;

    DBMS_OUTPUT.PUT_LINE('Список техники в ремонте:');

    LOOP
        FETCH v_cursor INTO v_title, v_repair_completion_date;
        EXIT WHEN v_cursor%NOTFOUND;

        DBMS_OUTPUT.PUT_LINE('Техника ' || v_title || ' ожидает окончания ремонта до ' || TO_CHAR(v_repair_completion_date, 'DD-MON-YYYY'));

        v_count := v_count + 1;
    END LOOP;

    CLOSE v_cursor;

    RETURN v_count;

EXCEPTION
    WHEN OTHERS THEN
        DBMS_OUTPUT.PUT_LINE('Произошла ошибка: ' || SQLERRM);
        RETURN -1; 
END;

    -- Процедура для вывода списка выполненных работ для техники за период времени
    PROCEDURE WorkStatsForTechnic(
    p_technic_id IN NUMBER,
    p_start_date IN DATE,
    p_end_date IN DATE
) AS
    CURSOR c_work_stats IS
        SELECT a.id_accounting_works, t.title
        FROM Accountin_works a
        JOIN Types_repairs t ON a.id_type_repair = t.id_type_repair
        WHERE a.id_technic = p_technic_id
        AND a.repair_start_date BETWEEN p_start_date AND p_end_date
        AND a.repair_completion_date BETWEEN p_start_date AND p_end_date;

    v_work_id NUMBER;
    v_work_description VARCHAR2(255);
    v_work_count NUMBER := 0;
BEGIN
    DBMS_OUTPUT.PUT_LINE('Перечень выполненных работ для техники ' || p_technic_id || ' за период с ' || p_start_date || ' по ' || p_end_date || ':');

    -- Открытие курсора
    OPEN c_work_stats;

    -- Получение данных из курсора и вывод перечня работ
    LOOP
        FETCH c_work_stats INTO v_work_id, v_work_description;
        EXIT WHEN c_work_stats%NOTFOUND;
        DBMS_OUTPUT.PUT_LINE('Выполнена работа '  || ': ' || v_work_description);
        v_work_count := v_work_count + 1;
    END LOOP;

    -- Закрытие курсора
    CLOSE c_work_stats;

    -- Вывод количества работ
    DBMS_OUTPUT.PUT_LINE('Количество выполненных работ: ' || v_work_count);
EXCEPTION
    WHEN NO_DATA_FOUND THEN
        DBMS_OUTPUT.PUT_LINE('Данные не найдены');
    WHEN OTHERS THEN
        DBMS_OUTPUT.PUT_LINE('Произошла ошибка: ' || SQLERRM);
END WorkStatsForTechnic;


    -- Перегруженная процедура для вывода списка выполненных работ для техники за период времени с фильтрацией по типу ремонта
   PROCEDURE WorkStatsForTechnic(
    p_technic_id IN NUMBER,
    p_start_date IN DATE,
    p_end_date IN DATE,
    p_repair_type_id IN NUMBER
) AS
    v_work_count NUMBER := 0;
    my_exception EXCEPTION;
    v_repair_exists NUMBER := 0;
BEGIN
    -- Проверяем существование типа ремонта
    SELECT COUNT(*)
    INTO v_repair_exists
    FROM Types_repairs
    WHERE id_type_repair = p_repair_type_id;
    
    IF v_repair_exists = 0 THEN
        RAISE my_exception;
    END IF;
    
    DBMS_OUTPUT.PUT_LINE('Для техники ' || p_technic_id || ' с ' || p_start_date || ' по ' || p_end_date);
    
    -- Очищаем временную таблицу перед началом
    DELETE FROM Temp_WorkStats;
    
    -- Итерируем по результатам запроса
    FOR r IN (
        SELECT a.id_accounting_works, t.title
        FROM Accountin_works a
        JOIN Types_repairs t ON a.id_type_repair = t.id_type_repair
        WHERE a.id_technic = p_technic_id
        AND a.repair_start_date BETWEEN p_start_date AND p_end_date
        AND a.repair_completion_date BETWEEN p_start_date AND p_end_date
        AND a.id_type_repair = p_repair_type_id
    ) LOOP
        -- Заносим результаты во временную таблицу
        INSERT INTO Temp_WorkStats (work_id, work_description)
        VALUES (r.id_accounting_works, r.title);
        
        v_work_count := v_work_count + 1;
    END LOOP;
    
    -- Выводим количество работ в DBMS_OUTPUT
    DBMS_OUTPUT.PUT_LINE('Количество работ: ' || v_work_count);
    
    -- Выводим перечень выполненных работ
    FOR r IN (SELECT * FROM Temp_WorkStats) LOOP
        DBMS_OUTPUT.PUT_LINE('Выполнена работа ' || ': ' || r.work_description); 
    END LOOP;
EXCEPTION
    WHEN NO_DATA_FOUND THEN
        DBMS_OUTPUT.PUT_LINE('Данные не найдены!');
    WHEN my_exception THEN
        DBMS_OUTPUT.PUT_LINE('Переданный тип ремонта не существует');
    WHEN OTHERS THEN
        DBMS_OUTPUT.PUT_LINE('Произошла ошибка: ' || SQLERRM);
END WorkStatsForTechnic;


    -- Локальная программа для определения количества техники в ремонте
   FUNCTION EquipmentInRepair
RETURN NUMBER
IS
    v_count NUMBER := 0;
    v_title VARCHAR2(255);
    v_repair_completion_date DATE;
    v_cursor SYS_REFCURSOR;

    PROCEDURE ProcessEquipment(p_title VARCHAR2, p_completion_date DATE) IS
        v_days_until_completion NUMBER;
    BEGIN
        -- Рассчитываем количество дней до окончания ремонта
        v_days_until_completion := TRUNC(p_completion_date) - TRUNC(SYSDATE);

        DBMS_OUTPUT.PUT_LINE('Дополнительная информация для техники ' || p_title || ': ожидает окончания ремонта до ' || TO_CHAR(p_completion_date, 'DD-MON-YYYY'));

        -- Выводим сообщение в зависимости от количества дней до окончания ремонта
        IF v_days_until_completion > 7 THEN
            DBMS_OUTPUT.PUT_LINE('Есть достаточно времени до окончания ремонта.');
        ELSIF v_days_until_completion > 0 THEN
            DBMS_OUTPUT.PUT_LINE('Осталось меньше недели до окончания ремонта.');
        ELSIF v_days_until_completion = 0 THEN
            DBMS_OUTPUT.PUT_LINE('Ремонт завершится сегодня!');
        ELSE
            DBMS_OUTPUT.PUT_LINE('Ремонт уже просрочен на ' || ABS(v_days_until_completion) || ' дней.');
        END IF;
    END ProcessEquipment;

BEGIN
    OPEN v_cursor FOR
        SELECT t.title, a.repair_completion_date
        FROM Accountin_works a
        JOIN Technics t ON a.id_technic = t.id_technik
        WHERE a.repair_start_date <= SYSDATE AND a.repair_completion_date >= SYSDATE;

    DBMS_OUTPUT.PUT_LINE('Список техники в ремонте:');

    LOOP
        FETCH v_cursor INTO v_title, v_repair_completion_date;
        EXIT WHEN v_cursor%NOTFOUND;

        -- Выводим информацию о технике с помощью локальной процедуры
        ProcessEquipment(v_title, v_repair_completion_date);

        v_count := v_count + 1;
    END LOOP;

    CLOSE v_cursor;

    RETURN v_count;

EXCEPTION
    WHEN OTHERS THEN
        DBMS_OUTPUT.PUT_LINE('Произошла ошибка: ' || SQLERRM);
        RETURN -1; 
END;

END RepairPackage;



DECLARE
    v_equipment_count NUMBER;
    v_work_count NUMBER;

BEGIN
    -- Вызов функции EquipmentInRepairFunction 
    DBMS_OUTPUT.PUT_LINE('----- Вызов функции EquipmentInRepairFunction -----');
    v_equipment_count := RepairPackage.EquipmentInRepairFunction();
    DBMS_OUTPUT.PUT_LINE('Количество техники в ремонте: ' || v_equipment_count);

    -- Вызов процедуры WorkStatsForTechnic 
    DBMS_OUTPUT.PUT_LINE('----- Вызов процедуры WorkStatsForTechnic  -----');
    RepairPackage.WorkStatsForTechnic(3, TO_DATE('2023-01-01', 'YYYY-MM-DD'), TO_DATE('2023-12-31', 'YYYY-MM-DD'));

    -- Вызов перегруженной процедуры WorkStatsForTechnic 
    DBMS_OUTPUT.PUT_LINE('----- Вызов перегруженной процедуры WorkStatsForTechnic  -----');
    RepairPackage.WorkStatsForTechnic(3, TO_DATE('2023-01-01', 'YYYY-MM-DD'), TO_DATE('2023-10-31', 'YYYY-MM-DD'), 1);

    -- Вызов перегруженной процедуры WorkStatsForTechnic с неправильный типом ремонта
    DBMS_OUTPUT.PUT_LINE('----- Вызов перегруженной процедуры WorkStatsForTechnic с неправильный типом ремонта ОШИБКА!  -----');
    RepairPackage.WorkStatsForTechnic(4, TO_DATE('2023-01-01', 'YYYY-MM-DD'), TO_DATE('2023-10-31', 'YYYY-MM-DD'), 11);

    -- Вызов локальной программы EquipmentInRepair 
    DBMS_OUTPUT.PUT_LINE('----- Вызов локальной программы EquipmentInRepair  -----');
    v_work_count := RepairPackage.EquipmentInRepair();
    DBMS_OUTPUT.PUT_LINE('Количество техники в ремонте: ' || v_work_count);
    
END;



PROCEDURE WorkStatsForTechnic(
    p_technic_id IN NUMBER,
    p_start_date IN DATE,
    p_end_date IN DATE,
    p_repair_type_id IN NUMBER
) AS
    v_work_count NUMBER := 0;
    my_exception EXCEPTION;
    v_repair_exists NUMBER := 0;
    v_row_count NUMBER := 0; -- Variable to store row count

BEGIN
    -- Проверяем существование типа ремонта
    SELECT COUNT(*)
    INTO v_repair_exists
    FROM Types_repairs
    WHERE id_type_repair = p_repair_type_id;

    IF v_repair_exists = 0 THEN
        RAISE my_exception;
    END IF;

    DBMS_OUTPUT.PUT_LINE('Для техники ' || p_technic_id || ' с ' || p_start_date || ' по ' || p_end_date);

    -- Очищаем временную таблицу перед началом
    DELETE FROM Temp_WorkStats;

    -- Итерируем по результатам запроса
    FOR r IN (
        SELECT a.id_accounting_works, t.title
        FROM Accountin_works a
        JOIN Types_repairs t ON a.id_type_repair = t.id_type_repair
        WHERE a.id_technic = p_technic_id
        AND a.repair_start_date BETWEEN p_start_date AND p_end_date
        AND a.repair_completion_date BETWEEN p_start_date AND p_end_date
        AND a.id_type_repair = p_repair_type_id
    ) LOOP
        -- Заносим результаты во временную таблицу
        INSERT INTO Temp_WorkStats (work_id, work_description)
        VALUES (r.id_accounting_works, r.title);

        v_work_count := v_work_count + 1;
    END LOOP;

    -- Проверяем количество строк, найденных запросом
    SELECT COUNT(*) INTO v_row_count FROM Temp_WorkStats;

    -- Проверяем, были ли найдены какие-либо данные
    IF v_row_count = 0 THEN
        RAISE NO_DATA_FOUND;
    END IF;

    -- Выводим количество работ в DBMS_OUTPUT
    DBMS_OUTPUT.PUT_LINE('Количество работ: ' || v_work_count);

    -- Выводим перечень выполненных работ
    FOR r IN (SELECT * FROM Temp_WorkStats) LOOP
        DBMS_OUTPUT.PUT_LINE('Выполнена работа ' || ': ' || r.work_description);
    END LOOP;

EXCEPTION
    WHEN NO_DATA_FOUND THEN
        DBMS_OUTPUT.PUT_LINE('Данные не найдены!');
    WHEN my_exception THEN
        DBMS_OUTPUT.PUT_LINE('Переданный тип ремонта не существует');
    WHEN OTHERS THEN
        DBMS_OUTPUT.PUT_LINE('Произошла ошибка: ' || SQLERRM);
END WorkStatsForTechnic;

мутация 

CREATE OR REPLACE TRIGGER CheckAndInsertMaintenance
BEFORE INSERT ON Accountin_works
FOR EACH ROW
DECLARE
    last_repair_date DATE;
    v_years_since_repair NUMBER;
    v_id_type_repair NUMBER := 4; -- Идентификатор типа ремонта "обслуживание"
BEGIN
    -- Находим дату последнего ремонта для данной техники
    SELECT MAX(repair_completion_date)
    INTO last_repair_date
    FROM Accountin_works
    WHERE id_technic = :NEW.id_technic;

    -- Если последний ремонт был выполнен и прошел год
    IF last_repair_date IS NOT NULL THEN
        v_years_since_repair := ROUND(MONTHS_BETWEEN(SYSDATE, last_repair_date) / 12);

        IF v_years_since_repair >= 1 THEN
            -- Добавляем плановый ремонт для данной техники только если такой записи еще нет
            BEGIN
                INSERT INTO Accountin_works (id_technic, id_type_repair, repair_start_date, repair_completion_date)
                SELECT :NEW.id_technic, v_id_type_repair, SYSDATE, SYSDATE + 7
                FROM dual
                WHERE NOT EXISTS (
                    SELECT 1
                    FROM Accountin_works
                    WHERE id_technic = :NEW.id_technic
                    AND id_type_repair = v_id_type_repair
                    AND repair_completion_date > SYSDATE - INTERVAL '1' YEAR
                );
            END;
        END IF;
    END IF;
END;


INSERT INTO Accountin_works (id_technic, id_type_repair, repair_start_date, repair_completion_date)
VALUES (10, 3, TO_DATE('2020-01-01', 'YYYY-MM-DD'), TO_DATE('2020-01-05', 'YYYY-MM-DD'));

INSERT INTO Accountin_works (id_technic, id_type_repair, repair_start_date, repair_completion_date)
VALUES (10, 3, TO_DATE('2022-01-01', 'YYYY-MM-DD'), TO_DATE('2022-01-05', 'YYYY-MM-DD'));


CREATE OR REPLACE TRIGGER trg_IO_AccountinWorksWithDetails
INSTEAD OF INSERT OR UPDATE OR DELETE ON AccountinWorksWithDetails
FOR EACH ROW
BEGIN
    IF INSERTING THEN
        INSERT INTO Accountin_works (
            id_accounting_works,
            id_technic,
            id_type_repair,
            repair_start_date,
            repair_completion_date,
            id_worker
        ) VALUES (
            :NEW.id_accounting_works,
            (SELECT id_technik FROM Technics WHERE title = :NEW.technic_title AND model = :NEW.technic_model),
            (SELECT id_type_repair FROM Types_repairs WHERE title = :NEW.repair_type),
            :NEW.repair_start_date,
            :NEW.repair_completion_date,
            (SELECT id_worker FROM Workers WHERE fname = :NEW.worker_fname AND lname = :NEW.worker_lname)
        );
        
    ELSIF UPDATING THEN
        UPDATE Accountin_works
        SET 
            id_technic = (SELECT id_technik FROM Technics WHERE title = :NEW.technic_title AND model = :NEW.technic_model),
            id_type_repair = (SELECT id_type_repair FROM Types_repairs WHERE title = :NEW.repair_type),
            repair_start_date = :NEW.repair_start_date,
            repair_completion_date = :NEW.repair_completion_date,
            id_worker = (SELECT id_worker FROM Workers WHERE fname = :NEW.worker_fname AND lname = :NEW.worker_lname)
        WHERE id_accounting_works = :OLD.id_accounting_works;

    ELSIF DELETING THEN
        DELETE FROM Accountin_works WHERE id_accounting_works = :OLD.id_accounting_works;
        -- Дополнительные операции удаления, если требуется
    END IF;
END;



CREATE OR REPLACE TRIGGER WorkRecordsView_instead_of
INSTEAD OF INSERT OR UPDATE OR DELETE ON AccountinWorksWithDetails
FOR EACH ROW
BEGIN
  IF INSERTING THEN
    INSERT INTO Accountin_works (id_technic, id_type_repair, repair_start_date, repair_completion_date)
    VALUES (
        (SELECT id_technik FROM Technics WHERE title = :new.technic_title AND model = :new.technic_model),
        (SELECT id_type_repair FROM Types_repairs WHERE title = :new.repair_type),
        :new.repair_start_date,
        :new.repair_completion_date
    );
    
  ELSIF UPDATING THEN
    UPDATE Accountin_works
    SET
        id_technic = (SELECT id_technik FROM Technics WHERE title = :new.technic_title AND model = :new.technic_model),
        id_type_repair = (SELECT id_type_repair FROM Types_repairs WHERE title = :new.repair_type),
        repair_start_date = :new.repair_start_date,
        repair_completion_date = :new.repair_completion_date
    WHERE id_accounting_works = :new.id_accounting_works;

  ELSIF DELETING THEN
    DELETE FROM List WHERE id_accounting_works = :old.id_accounting_works;
    DELETE FROM Accountin_works WHERE id_accounting_works = :old.id_accounting_works;
  END IF;
END;


DELETE FROM AccountinWorksWithDetails WHERE id_accounting_works = 62;




CREATE OR REPLACE TRIGGER update_end_date_trigger
FOR UPDATE OF REPAIR_START_DATE ON Accountin_works
COMPOUND TRIGGER
  date_difference NUMBER;
  REPAIR_COMPLETION_DATE Date;
  REPAIR_START_DATE Date;
  ID_ACCOUNTING_WORKS NUMBER;

BEFORE EACH ROW IS
BEGIN
  IF :NEW.REPAIR_START_DATE <> :OLD.REPAIR_START_DATE THEN
    date_difference := :NEW.REPAIR_START_DATE - :OLD.REPAIR_START_DATE;
  ELSE
    date_difference := NULL;
  END IF;
  REPAIR_START_DATE := :OLD.REPAIR_START_DATE;
 ID_ACCOUNTING_WORKS:= :OLD.ID_ACCOUNTING_WORKS;
END BEFORE EACH ROW;

AFTER STATEMENT IS
BEGIN
  IF date_difference IS NOT NULL THEN
        UPDATE Accountin_works
        SET REPAIR_COMPLETION_DATE = REPAIR_COMPLETION_DATE + date_difference
        WHERE ID_ACCOUNTING_WORKS = ID_ACCOUNTING_WORKS;
  END IF;
END AFTER STATEMENT;

END update_end_date_trigger;


UPDATE Accountin_works
SET REPAIR_START_DATE = TO_DATE('2023-01-01', 'YYYY-MM-DD')
WHERE ID_ACCOUNTING_WORKS = 666;





CREATE OR REPLACE TRIGGER update_end_date_trigger
FOR INSERT ON Accountin_works
COMPOUND TRIGGER
   last_repair_date DATE := NULL;
   start_date DATE;
   end_date DATE;
   technic NUMBER;
   is_planned_repair BOOLEAN := FALSE;
   is_already_processed BOOLEAN := FALSE;

   BEFORE EACH ROW IS
   BEGIN
       IF NOT is_already_processed THEN
           SELECT MAX(repair_completion_date)
           INTO last_repair_date
           FROM Accountin_works
           WHERE id_technic = :NEW.id_technic
           AND id_type_repair = 4;

           IF last_repair_date < SYSDATE - INTERVAL '1' YEAR THEN
               is_planned_repair := TRUE;
               start_date := SYSDATE;
               end_date := SYSDATE + INTERVAL '7' DAY;
               technic := :NEW.id_technic;
           ELSE
               is_planned_repair := FALSE;
           END IF;
       END IF;
   END BEFORE EACH ROW;

   AFTER STATEMENT IS
   BEGIN
       IF is_planned_repair AND NOT is_already_processed THEN
           -- Добавляем проверку наличия записи перед вставкой
           DECLARE
               entry_exists NUMBER;
           BEGIN
               SELECT COUNT(*)
               INTO entry_exists
               FROM Accountin_works
               WHERE id_technic = technic
               AND id_type_repair = 4
               AND repair_start_date = start_date
               AND repair_completion_date = end_date;

               IF entry_exists = 0 THEN
                   INSERT INTO Accountin_works (id_technic, id_type_repair, repair_start_date, repair_completion_date)
                   VALUES (technic, 4, start_date, end_date);
                   is_already_processed := TRUE;
               END IF;
           END;
       END IF;
   END AFTER STATEMENT;

END update_end_date_trigger;


INSERT INTO Accountin_works (id_technic, id_type_repair, repair_start_date, repair_completion_date)
VALUES (15, 4, TO_DATE('2020-01-01', 'YYYY-MM-DD'), TO_DATE('2020-01-08', 'YYYY-MM-DD'));

INSERT INTO Accountin_works (id_technic, id_type_repair, repair_start_date, repair_completion_date)
VALUES (15, 2, TO_DATE('2023-11-13', 'YYYY-MM-DD'), TO_DATE('2023-11-17', 'YYYY-MM-DD'));

INSERT INTO Accountin_works (id_technic, id_type_repair, repair_start_date, repair_completion_date)
VALUES (2, 2, TO_DATE('2025-01-01', 'YYYY-MM-DD'), TO_DATE('2025-01-08', 'YYYY-MM-DD'));