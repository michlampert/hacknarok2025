from schemas import Customer

def start():
    customers = [Customer(0, 'Mateusz', 'mateusz@email.com'),
                 Customer(1, 'Michał', 'michal@email.com'),
                 Customer(2, 'Jan', 'jan@email.com'),
                 Customer(3, 'Łukasz', 'lukasz@email.com')]

    return customers
